const responseFormatterOrder = (order) => {
  let total = 0;

  order.detail_order.map((item) => {
    total += item.qty * item.product.price;
  });
  const formatter = {
    id: order.id,
    customer_name: order.customer.customer_name,
    order_date: order.order_date,
    payment_metho: order.payment_method.name,
    order_status: order.order_status,
    items: order.detail_order.map((item) => ({
      product_name: item.product.name,
      qty: item.qty,
      total_price: item.qty * item.product.price,
    })),
    total,
  };

  return formatter;
};

const responseFormatterOrders = (orders) => {
  let result = [];
  orders.map((order) => {
    const formatted = responseFormatterOrder(order);
    result.push(formatted);
  });

  return result;
};

module.exports = { responseFormatterOrder, responseFormatterOrders };
