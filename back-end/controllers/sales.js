const SalesRepository = require("../models/salesModel");
const ProductRepository = require("../models/productsModel");

function findAllSales(req, res) {
  const { userId } = req.params;
  SalesRepository.findAll({where : { userId }}).then((result) => res.json(result));
}

function findSale(req, res) {
  const { id } = req.params;
  SalesRepository.findByPk(id).then((result) => res.json(result));
}

async function addSale(req, res) {
  const { quantity, productId, userId, value, saleDate } = req.body;

  try {
    const updateQuantitySuccess = await updateQuantity({ quantity, productId });

    if (updateQuantitySuccess) {
      const createdSale = await SalesRepository.create({
        productId,
        userId,
        quantity,
        value,
        saleDate,
      });

      res.json(createdSale);
    } else {
      res.status(422).json({
        error: "Quantidade solicitada é maior do que o estoque disponível!",
      });
    }
  } catch (error) {
    console.error("Falha ao atualizar o produto:", error);
    return res
      .status(500)
      .json({ error: "Falha ao atualizar o produto", message: error.message });
  }
}

async function updateSale(req, res) {
  const { id, productId, value, quantity, saleDate } = req.body;

  try {
    const updateQuantitySuccess = await updateQuantity({
      id,
      quantity,
      productId,
    });
    if (updateQuantitySuccess) {
      await SalesRepository.update(
        {
          productId,
          value,
          quantity,
          saleDate,
        },
        {
          where: {
            id,
          },
        }
      );

      const updatedProduct = await SalesRepository.findByPk(id);

      res.json(updatedProduct);
    } else {
      res.status(422).json({
        error: "Quantidade solicitada é maior do que o estoque disponível!",
      });
    }
  } catch (error) {
    console.error("Falha ao atualizar a venda:", error);
    return res
      .status(500)
      .json({ error: "Falha ao atualizar a venda", message: error.message });
  }
}

async function deleteSale(req, res) {
  const { id } = req.params;

  try {
    const sale = await SalesRepository.findByPk(id);
    const productId = sale.productId;

    const updateQuantitySuccess = await updateQuantity({
      id,
      quantity: 0,
      productId,
    });

    if (updateQuantitySuccess) {
      const deletedCount = await SalesRepository.destroy({
        where: { id },
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Venda não encontrada." });
      }

      return res.status(200).json({ message: "Venda removida com sucesso." });
    } else {
      res.status(500).json({
        error: "Falha ao atualizar a quantidade do estoque!",
      });
    }
  } catch (error) {
    console.error("Falha ao remover a venda:", error);
    return res
      .status(500)
      .json({ error: "Falha ao remover a venda", message: error.message });
  }
}

async function updateQuantity({ id, quantity, productId }) {
  try {
    let saleQuantity = 0;

    if (id) {
      const sale = await SalesRepository.findByPk(id);
      saleQuantity = sale.quantity;
    }

    const product = await ProductRepository.findByPk(productId);

    if (product.quantity >= quantity - saleQuantity) {
      product.quantity -= quantity - saleQuantity;
      await product.save();
      return true;
    } else {
      console.log("Quantidade maior do que o estoque!");
      return false;
    }
  } catch (error) {
    console.error("Falha ao atualizar a quantidade!", error);
    return false;
  }
}

module.exports = {
  findAllSales,
  findSale,
  addSale,
  updateSale,
  deleteSale,
};
