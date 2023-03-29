const Controller = require("./Controller.controller");
const CategoryService = require("../services/Category.service");
const categoryService = new CategoryService();

class CategoryController extends Controller {
  constructor() {
    super(categoryService);
  }
};

module.exports = CategoryController;
