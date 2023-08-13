const express = require("express");
const customerController = require("../controller/customerController");
const customer = express.Router();

customer.post("/", customerController.addCustomer);
customer.get("/", customerController.fetchCustomers);

module.exports = customer;
