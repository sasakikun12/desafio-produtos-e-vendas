import api from "../services/api";

const getAllProducts = (token, userId) =>
  api.get(`/products/all/${userId}`, { headers: { authorization: token } });

const removeProduct = (token, id) =>
  api.delete(`/products/${id}`, {
    headers: { authorization: token },
  });

const addProduct = (token, product) =>
  api.post("/products", product, { headers: { authorization: token } });

const editProduct = (token, product) =>
  api.put("/products", product, {
    headers: { authorization: token },
  });

export { getAllProducts, removeProduct, addProduct, editProduct };
