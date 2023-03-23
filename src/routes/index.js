const router = require("express").Router();

function $router(manager) {
  manager.use("/api/v1", router);
  router.get("/", (req, res) => res.send("E-Commerce API"))
}

module.exports = $router;
