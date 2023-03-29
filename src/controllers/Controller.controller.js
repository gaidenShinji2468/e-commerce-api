const catchError = require("../middlewares/catchError");

class Controller {
  constructor(service) {
    this.service = service;
  }

  getAll() {
    return catchError(async (req, res) => {
      const achieved = await this.service.getAll();

      res.status(200).json({
        statusCode: 200,
	message: "Read Success",
	data: achieved
      });
    });
  }

  get() {
    return catchError(async (req, res) => {
      const {id} = req.params;
      const achieved = await this.service.get(id);

      if(!achieved)
	res.status(404).json({
          statusCode: 404,
	  message: "Not Found"
	});

      res.status(200).json({
        statusCode: 200,
	message: "Read Success",
	data: achieved
      });
    });
  }

  create() {
    return catchError(async (req, res) => {
      const data = req.body;
      const created = await this.service.create(data);
      
      res.status(201).json({
        statusCode: 201,
	message: "Created Success",
        data: created
      });
    });
  }

  update() {
    return catchError(async (req, res) => {
      const {id} = req.params;
      const data = req.body;
      const updated = await this.service.update(id, data);

      if(!updated) 
	res.status(404).json({
          statusCode: 404,
	  message: "Not Found"
	});

      res.status(200).json({
        statusCode: 200,
	message: "Updated Success",
	data: updated
      });
    });
  }

  remove() {
    return catchError(async (req, res) => {
      const {id} = req.params;
      const removed = await this.service.remove(id);

      if(!removed)
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

module.exports = Controller;
