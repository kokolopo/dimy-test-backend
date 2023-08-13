const prisma = require("../db/prisma");

const addressController = {
  addAddress: async (req, res) => {
    const { customer_id, address } = req.body;
    try {
      await prisma.customer_address.create({
        data: { customer_id, address },
      });

      res.status(201).json({
        message: "successfully add new address",
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },
};

module.exports = addressController;
