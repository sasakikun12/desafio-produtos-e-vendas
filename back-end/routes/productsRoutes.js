const express = require("express");
const products = require("../controllers/products");
const verifyToken = require("../middleware/jwtMiddleware");

const productsRoutes = express.Router();

productsRoutes.get("/products/all/:userId", verifyToken, products.findAll);
productsRoutes.post("/products", verifyToken, products.addProduct);
productsRoutes.get("/products/:id", verifyToken, products.findProduct);
productsRoutes.put("/products", verifyToken, products.updateProduct);
productsRoutes.delete("/products/:id", verifyToken, products.deleteProduct);

productsRoutes.get(
  "/products/discount/:userId",
  verifyToken,
  products.findAllDiscount
);
productsRoutes.post("/products/discount", verifyToken, products.addDiscount);
productsRoutes.get("/products/discount/:id", verifyToken, products.addDiscount);
productsRoutes.put("/products/discount", verifyToken, products.updateDiscount);
productsRoutes.delete(
  "/products/discount/:id",
  verifyToken,
  products.deleteDiscount
);
module.exports = productsRoutes;
