const express = require("express");
const addressController = require("../controller/addressController");
const address = express.Router();

address.post("/", addressController.addAddress);

module.exports = address;
