const catchError = require("../middlewares/catchError");
const Controller = require("./Controller.controller");
const ProductImgService = require("../services/ProductImg.service");
const productImgService = new ProductImgService();

class ProductImgController extends Controller {
  constructor() {
    super(productImgService);
  }

  create() {
    return catchError(async (req, res) => {
      const url = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;
      const fileName = req.file.filename;
      const createdProductImg = await productImgService.create(url, fileName);

      res.status(201).json({
        statusCode: 201,
	message: "Created Success",
	data: createdProductImg
      });
    });
  }

  remove() {
    return catchError(async (req, res) => {
      const {id} = req.params;
      const deletedProductImg = await productImgService.remove(id);

      if(!deletedProductImg)
        res.status(404).json({
          statusCode: 404,
	  message: "Not Found"
	});
      
      res.status(200).json({
        statusCode: 200,
	message: "Deleted Success"
      });
    });
  }
};

module.exports = ProductImgController;
