const express = require("express");
const orderController = require("../controller/orderController");
const order = express.Router();

order.get("/customers/:customer_id", orderController.getByCustomerId);
order.get("/:order_id", orderController.getByOrderId);
order.post("/", orderController.addOrder);
order.delete("/:order_id", orderController.deleteOrder);

module.exports = order;
