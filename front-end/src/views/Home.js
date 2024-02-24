import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { getAllProducts, removeProduct } from "../resources/products";
import { getAllSales, removeSale, updateSale } from "../resources/sales";
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
    if (selected === "products") {
      getAllProducts(token, userid)
        .then((response) => {
          setList(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      getAllSales(token, userid)
        .then((response) => {
          setList(response.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  }, [token, selected]);

  const removeObj = ({ token, id }) => {
    if (selected === "products") {
      removeProduct(token, id)
        .then(() => {
          toast.success("Produto removido com sucesso!");
          setList(list.filter((obj) => obj.id !== id));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      removeSale(token, id)
        .then(() => {
          toast.success("Venda removida com sucesso!");
          setList(list.filter((obj) => obj.id !== id));
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  const selectedButtonLabel = () =>
    isProduct() ? "Novo produto" : "Nova venda";

  const isProduct = () => selected === "products";

  return (
    <>
      <div className="container-fluid vh-100 d-flex flex-column">
        <Navbar className="flex-shrink-0" />
        <div className="row flex-grow-1 justify-content-between">
          <div className="col-1 flex-fill border-end">
            <VerticalNavbar setSelected={setSelected} />
          </div>
          <StyledDiv className="col-11 flex-fill">
            <div className="p-3">
              <h2>{isProduct() ? "Produtos" : "Vendas"}</h2>
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
                    ) : (
                      <tr>
                        <th scope="col">Id Venda</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Id Produto</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Data Venda</th>
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
                          ) : (
                            <>
                              <td>{listItem.productId}</td>
                              <td>{listItem.quantity}</td>
                              <td>{listItem.saleDate}</td>
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
