const prisma = require("../db/prisma");

const customerController = {
  addCustomer: async (req, res) => {
    const { customer_name } = req.body;
    try {
      await prisma.customer.create({
        data: { customer_name },
      });

      res.status(201).json({
        message: "successfully add new customer",
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  fetchCustomers: async (req, res) => {
    try {
      const data = await prisma.customer.findMany({
        include: { customer_address: true },
      });

      res.status(200).json({
        message: "list customers",
        data,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = customerController;
