import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Input from "../components/Input";
import Button from "./Button";
import { addProduct, editProduct, getAllProducts } from "../resources/products";
import { toast } from "react-toastify";
import { addSales, updateSale } from "../resources/sales";
import ProductForm from "./ProductForm";
import SaleForm from "./SaleForm";

const RootModal = styled.div``;

const ModalHeader = styled.div`
  border-bottom: none;

  button {
    border: none;
    background-color: transparent;
    font-size: 26px;
  }
`;

const ModalBody = styled.div``;

const ModalFooter = styled.div`
  border-top: none;
`;

const Modal = ({
  action,
  toggleModal,
  listItem,
  selected,
  userId,
  token,
  setList,
}) => {
  const [sale, setSale] = useState(listItem || {});
  const [saleId, setSaleId] = useState("");
  const [product, setProduct] = useState(listItem || {});
  const [productId, setProductId] = useState("");
  const [productsList, setProductsList] = useState([]);

  const isProduct = () => selected === "products";
  const isCreate = () => action === "create";
  const isEdit = () => action === "edit";
  const isSales = () => selected === "sales";
  const modalTypeLabel = () => (isProduct() ? "produto" : "venda");

  const onProductChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSaleChange = (e) => {
    const { name, value } = e.target;

    setSale((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = () => {
    if (isProduct()) {
      if (isCreate()) {
        const productObj = {
          ...product,
          userId: userId,
        };

        addProduct(token, productObj)
          .then((response) => {
            const data = response.data;
            toggleModal({}, "");
            setList((prev) => [...prev, data]);
            toast.success("Produto criado com sucesso!");
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (isEdit()) {
        const productObj = {
          ...product,
          userId: userId,
          id: productId,
        };

        editProduct(token, productObj)
          .then((response) => {
            const data = response.data;
            toggleModal({}, "");
            setList((prev) => {
              return prev.map((obj) => {
                if (obj.id === productId) {
                  return {
                    ...obj,
                    description: product.description,
                    value: product.value,
                    quantity: product.quantity,
                    link: product.link,
                  };
                } else {
                  return obj;
                }
              });
            });
            toast.success("Produto editado com sucesso!");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    if (isSales()) {
      const saleObj = {
        ...sale,
        userId: userId,
      };
      if (isCreate()) {
        addSales(token, saleObj)
          .then((response) => {
            toggleModal({}, "");
            toast.success("Venda cadastrada com sucesso!");
            const data = response.data;
            setList((prev) => [...prev, data]);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      if (isEdit()) {
        updateSale(token, saleObj)
          .then((response) => {
            toggleModal({}, "");
            toast.success("Venda editada com sucesso!");
            setList((prev) => {
              return prev.map((obj) => {
                if (obj.id === saleId) {
                  return {
                    ...obj,
                    value: sale.value,
                    quantity: sale.quantity,
                    saleDate: sale.saleDate,
                  };
                } else {
                  return obj;
                }
              });
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  useEffect(() => {
    if (isProduct()) {
      setProduct(listItem || {});
      setProductId(listItem?.id);
    } else {
      setSale(listItem || {});
      setSaleId(listItem?.id);
    }
  }, [listItem]);

  console.log(listItem);

  useEffect(() => {
    if (isSales()) {
      getAllProducts(token, userId)
        .then((response) => {
          console.log(response.data);
          const products = response.data.filter(
            (product) => product.quantity > 0
          );
          setProductsList(products);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  }, [token, selected]);

  return (
    <RootModal className="modal d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <ModalHeader className="modal-header justify-content-between">
            <h5 className="modal-title">
              {isCreate() ? "Novo " : "Editar "} {modalTypeLabel()}
            </h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={toggleModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </ModalHeader>

          <ModalBody className="modal-body">
            {isProduct() ? (
              <ProductForm
                action={action}
                product={product}
                onProductChange={onProductChange}
              />
            ) : (
              <SaleForm
                action={action}
                productsList={productsList}
                sale={sale}
                onSaleChange={onSaleChange}
              />
            )}
          </ModalBody>

          <ModalFooter className="modal-footer">
            <Button
              type="button"
              className="btn"
              onClick={submit}
              text={"Enviar"}
            />
          </ModalFooter>
        </div>
      </div>
    </RootModal>
  );
};

export default Modal;
