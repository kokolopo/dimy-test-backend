const httpMocks = require("node-mocks-http");
const prisma = require("../db/prisma");
const orderController = require("../controller/orderController");

describe("getByOrderId function", () => {
  it("should get order by order_id and return status 200", async () => {
    // Simulate a request with a specific order_id
    const req = httpMocks.createRequest({
      method: "GET",
      params: { order_id: "123" }, // Change this to your desired order_id
    });
    const res = httpMocks.createResponse();

    // Simulate the data to be returned by Prisma
    const mockOrderData = {
      id: 123,
      // Include other properties as needed
    };
    const mockDetailOrderData = [
      {
        id: 456,
        // Include other properties as needed
        product: {
          // Include product properties
        },
      },
    ];
    const mockPaymentMethodData = {
      // Include payment method properties
    };
    const mockCustomerData = {
      // Include customer properties
    };
    jest.spyOn(prisma.order, "findMany").mockResolvedValue([
      {
        ...mockOrderData,
        detail_order: mockDetailOrderData,
        payment_method: mockPaymentMethodData,
        customer: mockCustomerData,
      },
    ]);

    await orderController.getByOrderId(req, res);

    expect(res.statusCode).toBe(200);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    // Perform assertions on the returned order data
    // You can check if the data matches the mock data provided above
  });

  it("should handle error and return status 500", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      params: { order_id: "123" },
    });
    const res = httpMocks.createResponse();

    // Simulate an error by rejecting the Prisma findMany operation
    jest
      .spyOn(prisma.order, "findMany")
      .mockRejectedValue(new Error("Some error"));

    await orderController.getByOrderId(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({ error: {} });
  });
});

describe("addOrder function", () => {
  it("should add an order and return status 201", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        customer_id: 123,
        payment_method_id: 456,
        items: [
          { product_id: 789, qty: 2 },
          // Add more items as needed
        ],
      },
    });
    const res = httpMocks.createResponse();

    // Simulate the created order object
    const mockOrder = {
      id: 123,
      // Include other properties as needed
    };
    jest.spyOn(prisma.order, "create").mockResolvedValue(mockOrder);

    await orderController.addOrder(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({ message: "seccussfully add order" });
  });

  it("should handle error and return status 500", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        customer_id: 123,
        payment_method_id: 456,
        items: [
          { product_id: 789, qty: 2 },
          // Add more items as needed
        ],
      },
    });
    const res = httpMocks.createResponse();

    // Simulate an error by rejecting the Prisma create operation
    jest
      .spyOn(prisma.order, "create")
      .mockRejectedValue(new Error("Some error"));

    await orderController.addOrder(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({ error: {} });
  });
});

describe("deleteOrder function", () => {
  it("should delete an order and return status 200", async () => {
    // Simulate a request with a specific order_id
    const req = httpMocks.createRequest({
      method: "DELETE",
      params: { order_id: "123" }, // Change this to your desired order_id
    });
    const res = httpMocks.createResponse();

    // Mock Prisma delete operations
    const mockDetailOrderDelete = jest
      .spyOn(prisma.detail_order, "deleteMany")
      .mockResolvedValue({});
    const mockOrderDelete = jest
      .spyOn(prisma.order, "delete")
      .mockResolvedValue({});

    await orderController.deleteOrder(req, res);

    expect(mockDetailOrderDelete).toHaveBeenCalledWith({
      where: { order_id: 123 },
    });
    expect(mockOrderDelete).toHaveBeenCalledWith({
      where: { id: 123 },
    });
    expect(res.statusCode).toBe(200);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({
      message: "data successfully deleted",
      is_deleted: true,
    });
  });

  it("should handle error and return status 500", async () => {
    const req = httpMocks.createRequest({
      method: "DELETE",
      params: { order_id: "123" },
    });
    const res = httpMocks.createResponse();

    // Simulate an error by rejecting the Prisma delete operations
    jest
      .spyOn(prisma.detail_order, "deleteMany")
      .mockRejectedValue(new Error("Some error"));
    jest
      .spyOn(prisma.order, "delete")
      .mockRejectedValue(new Error("Some error"));

    await orderController.deleteOrder(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({ error: {} });
  });
});
