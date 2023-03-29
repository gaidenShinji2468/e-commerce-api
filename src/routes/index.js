const router = require("express").Router();
const user = require("./user.router");
const category = require("./category.router");
const product = require("./product.router");
const productImg = require("./productImg.router");
const cart = require("./cart.router");
const purchase = require("./purchase.router");

function $router(manager) {
  manager.use("/api/v1", router);
  router.get("/", (req, res) => res.send("E-Commerce API"));
  router.use("/users", user);
  router.use("/categories", category);
  router.use("/products", product);
  router.use("/product_images", productImg);
  router.use("/cart", cart);
  router.use("/purchases", purchase);
}

module.exports = $router;
