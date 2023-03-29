const catchError = require("../middlewares/catchError");
const Controller = require("./Controller.controller");
const PurchaseService = require("../services/Purchase.service");
const purchaseService = new PurchaseService();

class PurchaseController extends Controller {
  constructor() {
    super(purchaseService);
  }

  getAll() {
    return catchError(async (req, res) => {
      const userId = req.user.id;
      const userPurchases = await purchaseService.getAll(userId);

      res.status(200).json({
        statusCode: 200,
	message: "Read Success",
	data: userPurchases
      });
    });
  }

  purchase() {
    return catchError(async (req, res) => {
      const userId = req.user.id;
      const createdPurchases = await purchaseService.purchase(userId);

      if(!createdPurchases)
	res.sendStatus(204);

      res.status(201).json({
        statusCode: 200,
	message: "Created Success",
	data: createdPurchases
      });
    }); 
  }
};

module.exports = PurchaseController;
