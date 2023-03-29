const fs = require("fs");
const path = require("path");
const CRUDService = require("./CRUD.service");
const ProductImg = require("../models/ProductImg.model");

class ProductImgService extends CRUDService {
  constructor() {
    super(ProductImg);
  }
  
  async create(url, fileName) {
    const createdProductImg = await ProductImg.create({url, fileName});
    
    return createdProductImg;
  }

  async remove(id) {
    const image = await ProductImg.findByPk(id);

    if(!image) return false;

    fs.unlinkSync(path.join(__dirname, "..", "public", "uploads", image.fileName));
    await image.destroy();
    return true;
  }
};

module.exports = ProductImgService;
