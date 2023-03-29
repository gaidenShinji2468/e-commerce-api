const catchError = require("../middlewares/catchError");
const Controller = require("./Controller.controller");
const ProductService = require("../services/Product.service");
const productService = new ProductService();

class ProductController extends Controller {
  constructor() {
    super(productService);
  }

  getAll() {
    return catchError(async (req, res) => {
      const {title, categoryId} = req.query;
      const achieved = await productService.getAll(title, categoryId);
    
      res.status(200).json({
        statusCode: 200,
	message: "Read Success",
	data: achieved
      });
    });
  }

  setImages() {
    return catchError(async (req, res) => {
      const {id} = req.params;
      const {productImgs} = req.body;
      
      const addedImages = await productService.setImages(id, productImgs);

      if(!addedImages)
	res.status(404).json({
          statusCode: 404,
	  message: "Not Found"
	});

      res.status(201).json({
        statusCode: 201, 
	message: "Created Success",
	data: addedImages
      });
    });
  }
};

module.exports = ProductController;
