const express = require("express");
const paymentController = require("../controller/paymentController");

const payments = express.Router();

payments.post("/", paymentController.addPayment);
payments.get("/", paymentController.listPayments);

module.exports = payments;
