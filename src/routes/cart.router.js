const router = require("express").Router();
const CartController = require("../controllers/Cart.controller");
const cartController = new CartController();
const verifyJWT = require("../middlewares/verifyJWT");

// protected endpoints
router.use(verifyJWT);
router
  .route("/")
  .get(cartController.getProducts())
  .post(cartController.addProduct());
router
  .route("/:id")
  .put(cartController.update())
  .delete(cartController.remove());

module.exports = router;
