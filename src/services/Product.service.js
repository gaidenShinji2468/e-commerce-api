const Product = require("../models/Product.model");
const CRUDService = require("./CRUD.service");
const ProductImg = require("../models/ProductImg.model");
const Category = require("../models/Category.model");
const {Op} = require("sequelize");

class ProductService extends CRUDService {
  constructor() {
    super(Product);
  }

  async getAll(title, categoryId) {
    const where = {};

    if(title) where.title = {[Op.iLike]: `%${title}%`};
    if(categoryId) where.categoryId = categoryId;
    
    const achieved = await Product.findAll({
      where,
      include: [ProductImg, Category]
    });

    return achieved;
  }

  async setImages(id, productImgs) {
    const achievedProduct = await Product.findByPk(id);

    if(!achievedProduct) return null;

    await achievedProduct.setProductImgs(productImgs);

    const addedImages = await achievedProduct.getProductImgs();

    return addedImages;
  }
};

module.exports = ProductService;
