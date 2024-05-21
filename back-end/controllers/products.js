const { Op } = require("sequelize");
const ProductRepository = require("../models/productsModel");
const ProductUpdateRepository = require("../models/productsUpdateModel");
const ProductDiscountRepository = require("../models/productsDiscountModel");

const { validateUrl } = require("../utils/validations");

function findAll(req, res) {
  const { userId } = req.params;
  ProductRepository.findAll({ where: { userId } }).then((result) =>
    res.json(result)
  );
}

function findProduct(req, res) {
  const { id } = req.params;
  ProductRepository.findByPk(id).then((result) => res.json(result));
}

function addProduct(req, res) {
  const { name, description, value, quantity, type, userId } = req.body;

  if (type === "digital" && !validateUrl(req.body.link)) {
    return res.status(422).json({ message: `Link inválido` });
  }

  ProductRepository.create({
    name,
    description,
    value,
    quantity,
    link: req.body.link,
    type,
    userId,
  })
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json({ message: error.message }));
}

async function updateProduct(req, res) {
  const { id, description, value, quantity, type, userId } = req.body;

  try {
    if (type === "digital" && !validateUrl(req.body.link)) {
      return res.status(422).json({ message: `Link inválido` });
    }

    const product = await ProductRepository.findByPk(id);

    if (product.value !== parseFloat(value)) {
      await ProductUpdateRepository.create({
        productId: id,
        userId,
        oldValue: parseFloat(product.value),
        newValue: parseFloat(value),
      });
    }

    await ProductRepository.update(
      {
        description,
        value,
        quantity,
        link: req.body.link,
      },
      {
        where: {
          id,
          value: parseFloat(product.value),
        },
      }
    );

    const updatedProduct = await ProductRepository.findByPk(id);

    res.json(updatedProduct);
  } catch (error) {
    console.error("Falha ao atualizar o produto:", error);
    return res
      .status(500)
      .json({ error: "Falha ao atualizar o produto", message: error.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  try {
    await ProductDiscountRepository.destroy({
      where: { productId: id },
    });

    await ProductUpdateRepository.destroy({
      where: { productId: id },
    });

    const deletedCount = await ProductRepository.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    return res.status(200).json({ message: "Produto removido com sucesso." });
  } catch (error) {
    console.error("Falha ao remover o produto:", error);
    return res
      .status(500)
      .json({ error: "Falha ao remover o produto", message: error.message });
  }
}

async function addDiscount(req, res) {
  const { productId, userId, value, startDate, endDate, startTime, endTime } =
    req.body;

  try {
    const sales = await ProductDiscountRepository.findOne({
      where: {
        productId,
        [Op.and]: [
          {
            [Op.and]: [
              { startDate: { [Op.lte]: endDate } },
              { endDate: { [Op.gte]: startDate } },
            ],
          },
          {
            [Op.and]: [
              { startTime: { [Op.lt]: endTime } },
              { endTime: { [Op.gt]: startTime } },
            ],
          },
        ],
      },
    });

    if (sales) {
      return res.status(422).json({ message: "Data com conflito" });
    }

    const createdSale = await ProductDiscountRepository.create({
      productId,
      userId,
      value,
      startDate,
      endDate,
      startTime,
      endTime,
    });

    res.json(createdSale);
  } catch (error) {
    console.error("Falha ao criar o desconto:", error);
    return res
      .status(500)
      .json({ error: "Falha ao criar o desconto", message: error.message });
  }
}

function findDiscount(req, res) {
  const { id } = req.params;
  ProductDiscountRepository.findByPk(id).then((result) => res.json(result));
}

function findAllDiscount(req, res) {
  const { userId } = req.params;
  ProductDiscountRepository.findAll({ where: { userId } })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ message: "Falha ao buscar os descontos" });
    });
}

async function updateDiscount(req, res) {
  const { id, productId, value, startDate, endDate, startTime, endTime } =
    req.body;

  try {
    const sales = await ProductDiscountRepository.findOne({
      where: {
        productId,
        [Op.and]: [
          {
            [Op.and]: [
              { startDate: { [Op.lte]: endDate } },
              { endDate: { [Op.gte]: startDate } },
            ],
          },
          {
            [Op.and]: [
              { startTime: { [Op.lt]: endTime } },
              { endTime: { [Op.gt]: startTime } },
            ],
          },
        ],
      },
    });

    if (sales) {
      return res.status(422).json({ message: "Data com conflito" });
    }

    await ProductDiscountRepository.update(
      {
        value,
        startDate,
        endDate,
        startTime,
        endTime,
      },
      {
        where: {
          id,
        },
      }
    );

    const updatedProduct = await ProductDiscountRepository.findByPk(id);

    res.json(updatedProduct);
  } catch (error) {
    console.error("Falha ao atualizar o desconto do produto:", error);
    return res.status(500).json({
      error: "Falha ao atualizar o desconto do produto",
      message: error.message,
    });
  }
}

async function deleteDiscount(req, res) {
  const { id } = req.params;

  try {
    const deletedCount = await ProductDiscountRepository.destroy({
      where: { id },
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: `Desconto '${id}' não encontrado.` });
    }

    return res.status(200).json({ message: `Desconto deletado com sucesso.` });
  } catch (error) {
    console.error("Falha ao deletar o desconto:", error);
    return res
      .status(500)
      .json({ error: "Falha ao deletar o desconto", message: error.message });
  }
}

module.exports = {
  findAll,
  addProduct,
  findProduct,
  updateProduct,
  deleteProduct,
  addDiscount,
  updateDiscount,
  findDiscount,
  findAllDiscount,
  deleteDiscount,
};
