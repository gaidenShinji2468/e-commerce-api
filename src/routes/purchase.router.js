const router = require("express").Router();
const PurchaseController = require("../controllers/Purchase.controller");
const purchaseController = new PurchaseController();
const verifyJWT = require("../middlewares/verifyJWT");

// protected endpoints
router.use(verifyJWT);
router
  .route("/")
  .get(purchaseController.getAll())
  .post(purchaseController.purchase());

module.exports = router;
