import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {
  getAllProducts,
  removeProduct,
  getAllDiscounts,
  removeDiscount,
} from "../resources/products";
import { getAllSales, removeSale } from "../resources/sales";

import Button from "../components/Button";
import VerticalNavbar from "../components/VerticalNav";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import { toast } from "react-toastify";

const StyledDivContainer = styled.div`
  background-color: #fff;
  height: 80vh;
`;

const StyledDiv = styled.div`
  background-color: #f4f5f7;
`;

const Home = () => {
  const [list, setList] = useState([]);
  const token = Cookies.get("token");
  const userid = Cookies.get("userid");
  const [selected, setSelected] = useState("products");
  const [modalOpen, setModalOpen] = useState(false);
  const [edit, setEdit] = useState({});
  const [selectedAction, setSelectedAction] = useState("");

  const toggleModal = (item, action) => {
    setModalOpen(!modalOpen);
    setSelectedAction(action);
    setEdit(item);
  };

  useEffect(() => {
    switch (selected) {
      case "products":
        getAllProducts(token, userid)
          .then((response) => {
            setList(response.data);
          })
          .catch((error) => {
            setList([]);
            toast.error(error.response.data.message);
          });
        break;
      case "sales":
        getAllSales(token, userid)
          .then((response) => {
            setList(response.data);
          })
          .catch((error) => {
            setList([]);
            toast.error(error.response.data.message);
          });
        break;
      case "discounts":
        getAllDiscounts(token, userid)
          .then((response) => {
            setList(response.data);
          })
          .catch((error) => {
            setList([]);
            toast.error(error.response.data.message);
          });
        break;
    }
  }, [token, selected]);

  const removeObj = ({ token, id }) => {
    switch (selected) {
      case "products":
        removeProduct(token, id)
          .then(() => {
            toast.success("Produto removido com sucesso!");
            setList(list.filter((obj) => obj.id !== id));
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        break;
      case "sales":
        removeSale(token, id)
          .then(() => {
            toast.success("Venda removida com sucesso!");
            setList(list.filter((obj) => obj.id !== id));
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        break;
      case "discounts":
        removeDiscount(token, id)
          .then(() => {
            toast.success("Desconto removido com sucesso!");
            setList(list.filter((obj) => obj.id !== id));
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
        break;
    }
  };

  const selectedButtonLabel = () =>
    isProduct() ? "Novo produto" : isSale() ? "Nova venda" : "Novo Desconto";

  const isProduct = () => selected === "products";

  const isSale = () => selected === "sales";

  return (
    <>
      <div className="container-fluid vh-100 d-flex flex-column">
        <Navbar className="flex-shrink-0" />
        <div className="row flex-grow-1 justify-content-between">
          <div className="col-12 col-lg-1 flex-fill border-end">
            <VerticalNavbar setSelected={setSelected} />
          </div>
          <StyledDiv className="col-12 col-lg-11 flex-fill">
            <div className="p-3">
              <h2>
                {isProduct() ? "Produtos" : isSale() ? "Vendas" : "Descontos"}
              </h2>
            </div>
            <StyledDivContainer className="container-fluid rounded">
              <div className="d-flex justify-content-end rounded">
                <Button
                  onClick={() => toggleModal({}, "create")}
                  text={selectedButtonLabel()}
                  css={"m-3"}
                />
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    {isProduct() ? (
                      <tr>
                        <th scope="col">Id Produto</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Link</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Remover</th>
                      </tr>
                    ) : isSale() ? (
                      <tr>
                        <th scope="col">Id Venda</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Id Produto</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Data Venda</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Remover</th>
                      </tr>
                    ) : (
                      <tr>
                        <th scope="col">Id Desconto</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Id Produto</th>
                        <th scope="col">Data Inicial</th>
                        <th scope="col">Data Final</th>
                        <th scope="col">Hora Inicial</th>
                        <th scope="col">Hora Final</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Remover</th>
                      </tr>
                    )}
                  </thead>
                  <tbody>
                    {list &&
                      list.map((listItem, index) => (
                        <tr key={index} className="align-middle">
                          <td>{listItem.id}</td>
                          <td>{listItem.value}</td>
                          {isProduct() ? (
                            <>
                              <td>{listItem.name}</td>
                              <td>{listItem.description}</td>
                              <td>{listItem.quantity}</td>
                              <td>{listItem.link}</td>
                            </>
                          ) : isSale() ? (
                            <>
                              <td>{listItem.productId}</td>
                              <td>{listItem.quantity}</td>
                              <td>{listItem.saleDate}</td>
                            </>
                          ) : (
                            <>
                              <td>{listItem.productId}</td>
                              <td>{listItem.startDate}</td>
                              <td>{listItem.endDate}</td>
                              <td>{listItem.startTime}</td>
                              <td>{listItem.endTime}</td>
                            </>
                          )}
                          <td>
                            <Button
                              kind="warning"
                              text="Editar"
                              onClick={() => toggleModal(listItem, "edit")}
                            />
                          </td>
                          <td>
                            <Button
                              kind="danger"
                              text="Remover"
                              onClick={() =>
                                removeObj({ token, id: listItem.id })
                              }
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </StyledDivContainer>
          </StyledDiv>
        </div>
      </div>
      {modalOpen && (
        <Modal
          action={selectedAction}
          isOpen={modalOpen}
          toggleModal={toggleModal}
          listItem={edit}
          selected={selected}
          userId={userid}
          token={token}
          setList={setList}
        />
      )}
    </>
  );
};

export default Home;
