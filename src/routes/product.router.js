const router = require("express").Router();
const ProductController = require("../controllers/Product.controller");
const productController = new ProductController();
const verifyJWT = require("../middlewares/verifyJWT");
const isAdmin = require("../middlewares/isAdmin");

// public endpoints
router
  .route("/")
  .get(productController.getAll());
router
  .route("/:id")
  .get(productController.get());

// protected endpoints
router.use(verifyJWT);
router.use(isAdmin);
router
  .route("/")
  .post(productController.create());
router
  .route("/:id/images")
  .post(productController.setImages());
router
  .route("/:id")
  .put(productController.update())
  .delete(productController.remove());

module.exports = router;
