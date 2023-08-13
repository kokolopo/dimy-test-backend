const prisma = require("../db/prisma");

const productController = {
  listProducts: async (req, res) => {
    try {
      const data = await prisma.product.findMany();

      res.status(200).json({
        message: "list products",
        data,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },

  addProduct: async (req, res) => {
    const { name, price } = req.body;
    try {
      await prisma.product.create({
        data: { name, price },
      });

      res.status(201).json({ message: "successfully add a product" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  updateProduct: async (req, res) => {
    const { product_id } = req.params;
    const { name, price } = req.body;

    try {
      await prisma.product.update({
        where: { id: parseInt(product_id) },
        data: {
          name,
          price,
        },
      });
      res
        .status(200)
        .json({ message: "successfully update a product", is_updated: true });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = productController;
