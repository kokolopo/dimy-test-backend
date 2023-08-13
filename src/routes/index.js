const express = require("express");
const routes = express.Router();

const orders = require("./orderRoute");
const customers = require("./customerRoute");
const addresses = require("./addressRoute");
const products = require("./productRoute");
const payments = require("./paymentRoute");

routes.use("/orders", orders);
routes.use("/customers", customers);
routes.use("/addresses", addresses);
routes.use("/products", products);
routes.use("/payments", payments);

module.exports = routes;
