const CRUDService = require("./CRUD.service");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const ProductImg = require("../models/ProductImg.model");

class CartService extends CRUDService {
  constructor() {
    super(Cart);
  }

  async getProducts(userId) {
    const achievedCarts = await Cart.findAll({
      where: {userId},
      include: [{
        model: Product,
	include: [ProductImg]
      }],
      attributes: ["id", "quantity", "createdAt", "updatedAt"]
    });

    return achievedCarts;
  }

  async addProduct(userId, productId, quantity) {
    const achievedProduct = await Product.findByPk(productId);

    if(!achievedProduct) return null;

    const achievedCart = await Cart.findOne({where: {productId}});

    if(!achievedCart) {
      const createdCart = await Cart.create({
        userId,
	productId,
	quantity
      });

      return createdCart;
    }

    return this.update(achievedCart.id, quantity);
  }
};

module.exports = CartService;
