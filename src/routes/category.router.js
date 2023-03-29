const router = require("express").Router();
const CategoryController = require("../controllers/Category.controller");
const categoryController = new CategoryController();
const verifyJWT = require("../middlewares/verifyJWT");
const isAdmin = require("../middlewares/isAdmin");

// public endpoints
router
  .route("/")
  .get(categoryController.getAll());

// protected endpoints
router.use(verifyJWT);
router.use(isAdmin);
router
  .route("/")
  .post(categoryController.create());
router
  .route("/:id")
  .delete(categoryController.remove());

module.exports = router;
