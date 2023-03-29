const Category = require("../models/Category.model");
const CRUDService = require("./CRUD.service");

class CategoryService extends CRUDService {
  constructor() {
    super(Category);
  }
};

module.exports = CategoryService;
