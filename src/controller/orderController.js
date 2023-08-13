const prisma = require("../db/prisma");
const {
  responseFormatterOrders,
  responseFormatterOrder,
} = require("../utils/responseFormatterOrder");

const orderController = {
  getByCustomerId: async (req, res) => {
    const { customerId } = req.params;
    try {
      const data = await prisma.order.findMany({
        where: { customer_id: customerId },
        include: {
          detail_order: { include: { product: true } },
          payment_method: true,
          customer: true,
        },
      });

      const orders = responseFormatterOrders(data);

      res.status(200).json({
        message: "OK",
        data: orders,
      });
    } catch (error) {
      res.status(500).json({
        message: "server error",
        error,
      });
    }
  },
  getByOrderId: async (req, res) => {
    const { order_id } = req.params;

    try {
      const data = await prisma.order.findMany({
        where: { id: parseInt(order_id) },
        include: {
          detail_order: { include: { product: true } },
          payment_method: true,
          customer: true,
        },
      });

      const order = responseFormatterOrder(data[0]);

      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  addOrder: async (req, res) => {
    const { customer_id, payment_method_id, items } = req.body;

    try {
      const order = await prisma.order.create({
        data: {
          customer: { connect: { id: customer_id } },
          payment_method: { connect: { id: payment_method_id } },
          order_status: "cek",
          detail_order: {
            create: items.map((item) => ({
              product: { connect: { id: item.product_id } },
              qty: item.qty,
            })),
          },
        },
      });

      res.status(201).json({
        message: "seccussfully add order",
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  deleteOrder: async (req, res) => {
    const { order_id } = req.params;

    try {
      await prisma.detail_order.deleteMany({
        where: { order_id: parseInt(order_id) },
      });

      await prisma.order.delete({
        where: {
          id: parseInt(order_id),
        },
      });

      res.status(200).json({
        message: "data successfully deleted",
        is_deleted: true,
      });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = orderController;
