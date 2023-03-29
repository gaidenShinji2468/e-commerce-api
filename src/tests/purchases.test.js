const req = require("supertest");
const manager = require("../manager");
const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");
require("../models");
let token;
let purchaseId;

beforeAll(async () => {
  const user = {
    email: "gsh.testemail@gmail.com",
    password: "gsh1234"
  };
  const res = await req(manager).post("/api/v1/users/login").send(user);

  token = res.body.data;
});

test("POST /purchases should add cart to shopping and remove cart", async () => {
  const product = await Product.create({
    title: 'MacBook Air 13.3" Laptop - Apple M1 chip',
    description: "It’s here. Our first chip designed specifically for Mac. Packed with an astonishing 16 billion transistors, the Apple M1 system on a chip (SoC) integrates the CPU, GPU, Neural Engine, I/O, and so much more onto a single tiny chip. With incredible performance, custom technologies, and industry-leading power efficiency, M1 is not just a next step for Mac — it’s another level entirely.",
    price: 100
  });
    
  await Cart.bulkCreate([
    {
      quantity: 1,
      productId: product.id,
      userId: 2
    }
  ]);

  let cart = await Cart.findAll({ 
    attributes: [ 'quantity', 'userId', 'productId' ],
    raw: true
  });
  const res = await req(manager).post("/api/v1/purchases").send(cart).set('Authorization', `Bearer ${token}`);    
    
  await product.destroy();
  await Cart.destroy({where: {userId: 2}});
  cart = await Cart.findAll();
  expect(res.status).toBe(201);
  expect(cart).toHaveLength(0);
});

test("GET /purchases should return all the purchases", async() => {
    const res = await req(manager).get("/api/v1/purchases").set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
});
