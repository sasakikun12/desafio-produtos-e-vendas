const express = require("express");
const sales = require("../controllers/sales");
const verifyToken = require('../middleware/jwtMiddleware');

const salesRoutes = express.Router();

salesRoutes.get("/sales", verifyToken, sales.findAllSales);
salesRoutes.post("/sales", verifyToken, sales.addSale);
salesRoutes.get("/sales/:id", verifyToken, sales.findSale);
salesRoutes.put("/sales", verifyToken, sales.updateSale);
salesRoutes.delete("/sales/:id/:userId", verifyToken, sales.deleteSale);

module.exports = salesRoutes;
