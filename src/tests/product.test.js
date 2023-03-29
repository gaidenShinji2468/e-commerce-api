const req = require("supertest");
const manager = require("../manager");
require("../models");
let token;
let productId;

beforeAll(async () => {
  const user = {
    email: "gsh.testemail@gmail.com",
    password: "gsh1234"
  };
  const res = await req(manager).post("/api/v1/users/login").send(user);

  token = res.body.data;
});

test("POST /products should to create a product", async () => {
  const product = {
    title: "Testing Product",
    description: "Product description",
    price: 1234
  };
  const res = await req(manager).post("/api/v1/products").send(product).set("Authorization", `Bearer ${token}`);

  productId = res.body.data.id;
  expect(res.status).toBe(201);
  expect(res.body.data.title).toBe(product.title);
});

test("GET /products should to return all products", async () => {
  const res = await req(manager).get("/api/v1/products").set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.data).toHaveLength(1);
  expect(res.body.data[0].title).toBeDefined();
});

test("PUT /products/:id should to update a products", async () => {
  const product = {
    title: "Product updated"
  };
  const res = await req(manager).put(`/api/v1/products/${productId}`).send(product).set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.data.title).toBe(product.title);
});

test("DELETE /products/:id should to delete a product", async () => {
  const res = await req(manager).delete(`/api/v1/products/${productId}`).set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
});
