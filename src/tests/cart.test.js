const req = require("supertest");
const manager = require("../manager");
const Product = require("../models/Product.model");
require("../models");
let token;
let cartId;

beforeAll(async () => {
  const user = {
    email: "gsh.testemail@gmail.com",
    password: "gsh1234"
  };
  const res = await req(manager).post("/api/v1/users/login").send(user);

  token = res.body.data;
});

test('POST /cart should create one product', async() => {
    const product = await Product.create({
      title: 'MacBook Air 13.3" Laptop - Apple M1 chip',
      description: "It’s here. Our first chip designed specifically for Mac. Packed with an astonishing 16 billion transistors, the Apple M1 system on a chip (SoC) integrates the CPU, GPU, Neural Engine, I/O, and so much more onto a single tiny chip. With incredible performance, custom technologies, and industry-leading power efficiency, M1 is not just a next step for Mac — it’s another level entirely.",
      price: 100,                
    });
    const cart = {
      quantity: 1,
      productId: product.id
    };
    const res = await req(manager).post("/api/v1/cart").send(cart).set(`Authorization`, `Bearer ${token}`);

    await product.destroy();
    cartId = res.body.data.id;
    expect(res.status).toBe(201);
    expect(res.body.data.quantity).toBe(cart.quantity);
});

test('GET /cart should return all categories', async() => {
    const res = await req(manager).get("/api/v1/cart").set(`Authorization`, `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].quantity).toBeDefined();
});

test('PUT /cart/:id should update one cart', async() => {
    const cart = {
        quantity : 5
    };
    const res = await req(manager).put(`/api/v1/cart/${cartId}`).send(cart).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data.quantity).toBe(cart.quantity);

});

test('DELETE /cart/:id should delete one cart', async() => {
    const res = await req(manager).delete(`/api/v1/cart/${cartId}`).set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
})
