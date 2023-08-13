const prisma = require("../db/prisma");

const paymentController = {
  addPayment: async (req, res) => {
    const { name, is_active } = req.body;
    try {
      await prisma.payment_method.create({ data: { name, is_active } });

      res.status(201).json({ message: "successfully add payment method" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  listPayments: async (req, res) => {
    try {
      const data = await prisma.payment_method.findMany();

      res.status(200).json({ message: "list payment method", data });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = paymentController;
