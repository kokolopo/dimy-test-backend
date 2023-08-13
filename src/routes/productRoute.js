const express = require("express");
const productController = require("../controller/productController");
const product = express.Router();

product.post("/", productController.addProduct);
product.get("/", productController.listProducts);
product.put("/:product_id", productController.updateProduct);

module.exports = product;
