const router = require("express").Router();
const UserController = require("../controllers/User.controller");
const userController = new UserController;
const verifyJWT = require("../middlewares/verifyJWT");
const isAdmin = require("../middlewares/isAdmin");

// public endpoints
router
  .route("/")
  .get(verifyJWT, isAdmin, userController.getAll()) // protected endpoint
  .post(userController.create());
router
  .route("/verify_email/:code")
  .get(userController.verifyCode());
router
  .route("/login")
  .post(userController.login());

// protected endpoints
router.use(verifyJWT);
router
  .route("/me")
  .get(userController.logged());
router.use(isAdmin);
router
  .route("/:id")
  .get(userController.get())
  .put(userController.update())
  .delete(userController.remove());

module.exports = router;
