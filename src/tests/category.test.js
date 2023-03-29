const req = require("supertest");
const manager = require("../manager");
require("../models");
let token;
let categoryId;

beforeAll(async () => {
  const user = {
    email: "gsh.testemail@gmail.com",
    password: "gsh1234"
  };
  const res = await req(manager).post("/api/v1/users/login").send(user);

  token = res.body.data;
});

test("POST /categories should to create a category", async () => {
  const category = {
    name: "Smartphones"
  };
  const res = await req(manager).post("/api/v1/categories").send(category).set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(201);
  expect(res.body.data.name).toBe(category.name);
});

test("GET /categories should to return all categories", async () => {
  const res = await req(manager).get("/api/v1/categories").set("Authorization", `Bearer ${token}`);

  categoryId = res.body.data[0].id;
  expect(res.status).toBe(200);
  expect(res.body.data).toHaveLength(1);
  expect(res.body.data[0].name).toBeDefined();
});

test("DELETE /categories/:id should to delete a category", async () => {
  const res = await req(manager).delete(`/api/v1/categories/${categoryId}`).set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
});
