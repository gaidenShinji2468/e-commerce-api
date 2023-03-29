const req = require("supertest");
const manager = require("../manager");
require("../models");
let token;
let userId;

test("POST /users/login should to log in a user", async () => {
  const user = {
    email: "gsh.testemail@gmail.com",
    password: "gsh1234"
  };
  const res = await req(manager).post("/api/v1/users/login").send(user);

  token = res.body.data;
  expect(res.status).toBe(200);
  expect(res.body.data).toBeDefined();
});

test("POST /users should to create a user", async () => {
  const user = {
    firstName: "Test",
    lastName: "Test",
    email: "test@test.test",
    password: "test1234",
    phone: "1234567890",
    role: "test"
  };
  const res = await req(manager).post("/api/v1/users").send(user);

  userId = res.body.data.id;
  expect(res.status).toBe(201);
  expect(res.body.data.role).toBe(user.role);
});

test("GET /users should to return all users", async () => {
  const res = await req(manager).get("/api/v1/users").set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.data).toHaveLength(2);
  expect(res.body.data[0].firstName).toBeDefined();
});

test("PUT /users/:id should to update a user", async () => {
  const user = {
    firstName: "Gaiden",
    lastName: "Shinji"
  };
  const res = await req(manager).put(`/api/v1/users/${userId}`).send(user).set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body.data.firstName).toBe(user.firstName);
});

test("DELETE /users/:id should to delete a user", async () => {
  const res = await req(manager).delete(`/api/v1/users/${userId}`).set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
});
