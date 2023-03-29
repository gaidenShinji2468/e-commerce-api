const CRUDService = require("./CRUD.service");
const Purchase = require("../models/Purchase.model");
const Product = require("../models/Product.model");
const ProductImg = require("../models/ProductImg.model");
const Cart = require("../models/Cart.model");

class PurchaseService extends CRUDService {
  constructor() {
    super(Purchase);
  }

  async getAll(userId) {
    const userPurchases = await Purchase.findAll({
      where: {userId},
      include: [
	{
	  model: Product,
	  include: [ProductImg]
	}
      ],
      attributes: ["id", "quantity", "createdAt", "updatedAt"]
    });

    return userPurchases;
  }

  async purchase(userId) {
    const userCart = await Cart.findAll({
      where: {userId},
      attributes: ["userId", "productId", "quantity"],
      raw: true
    });

    if(!userCart) return null;

    const createdPurchase = await Purchase.bulkCreate(userCart);
    await Cart.destroy({where: {userId}});

    return createdPurchase;
  }
};

module.exports = PurchaseService;
