const catchError = require("../middlewares/catchError");
const CartService = require("../services/Cart.service");
const Controller = require("./Controller.controller");
const cartService = new CartService();

class CartController extends Controller {
  constructor() {
    super(cartService);
  }

  getProducts() {
    return catchError(async (req, res) => {
      const userId = req.user.id;
      const achievedProducts = await cartService.getProducts(userId);

      res.status(200).json({
        statusCode: 200,
	message: "Read Success",
	data: achievedProducts
      });
    });
  }

  addProduct() {
    return catchError(async (req, res) => {
      const userId = req.user.id;
      const {quantity, productId} = req.body;
      const createdCart = await cartService.addProduct(userId, productId, quantity);

      if(!createdCart)
	res.status(404).json({
          statusCode: 404,
	  message: "Not Found"
	});

      res.status(201).json({
        statusCode: 201,
	message: "Created Success",
	data: createdCart
      });
    });
  }
};

module.exports = CartController;
