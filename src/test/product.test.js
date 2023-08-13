const httpMocks = require("node-mocks-http");
const productController = require("../controller/productController");
const prisma = require("../db/prisma");

describe("addProduct function", () => {
  it("should add a product and return status 201", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: { name: "Product Name", price: 10 },
    });
    const res = httpMocks.createResponse();

    await productController.addProduct(req, res);

    expect(res.statusCode).toBe(201);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({ message: "successfully add a product" });
  });

  it("should handle error and return status 500", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: { name: "Product Name", price: 10 },
    });
    const res = httpMocks.createResponse();

    // Simulate an error by rejecting the Prisma create operation
    jest
      .spyOn(prisma.product, "create")
      .mockRejectedValue(new Error("Some error"));

    await productController.addProduct(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({ error: {} });
  });
});

describe("updateProduct function", () => {
  it("should update a product and return status 200", async () => {
    // Simulate a request with a specific product_id and updated data
    const req = httpMocks.createRequest({
      method: "PUT",
      params: { product_id: "123" }, // Change this to your desired product_id
      body: { name: "Updated Product Name", price: 15 },
    });
    const res = httpMocks.createResponse();

    // Mock Prisma update operation
    const mockProductUpdate = jest
      .spyOn(prisma.product, "update")
      .mockResolvedValue({});

    await productController.updateProduct(req, res);

    expect(mockProductUpdate).toHaveBeenCalledWith({
      where: { id: 123 },
      data: { name: "Updated Product Name", price: 15 },
    });
    expect(res.statusCode).toBe(200);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({
      message: "successfully update a product",
      is_updated: true,
    });
  });

  it("should handle error and return status 500", async () => {
    const req = httpMocks.createRequest({
      method: "PUT",
      params: { product_id: "123" },
      body: { name: "Updated Product Name", price: 15 },
    });
    const res = httpMocks.createResponse();

    // Simulate an error by rejecting the Prisma update operation
    jest
      .spyOn(prisma.product, "update")
      .mockRejectedValue(new Error("Some error"));

    await productController.updateProduct(req, res);

    expect(res.statusCode).toBe(500);
    expect(res._isJSON()).toBe(true);
    const data = JSON.parse(res._getData());
    expect(data).toEqual({ error: {} });
  });
});
