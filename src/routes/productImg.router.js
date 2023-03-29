const router = require("express").Router();
const ProductImgController = require("../controllers/ProductImg.controller");
const productImgController = new ProductImgController();
const verifyJWT = require("../middlewares/verifyJWT");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../services/multer.service.js");

// protected endpoints
router.use(verifyJWT);
router.use(isAdmin);
router
  .route("/")
  .get(productImgController.getAll())
  .post(upload.single("image"), productImgController.create());
router
  .route("/:id")
  .delete(productImgController.remove());

module.exports = router;
