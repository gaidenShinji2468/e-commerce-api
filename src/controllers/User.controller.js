const Controller = require("./Controller.controller");
const UserService = require("../services/User.service");
const userService = new UserService;
const catchError = require("../middlewares/catchError");

class UserController extends Controller {
  constructor() {
    super(userService);
  } 

  login() {
    return catchError(async (req, res) => {
      const {email, password} = req.body;
      const logged = await userService.login(email, password);
       
      if(typeof logged === "number")
	switch(logged) {
          case 401:
	    res.status(logged).json({
              statusCode: logged,
	      message: "Unauthorized"
	    });
	  case 403:
	    res.status(logged).json({
              statusCode: logged,
	      message: "Forbidden"
	    });
	  case 404:
	    res.status(logged).json({
              statusCode: logged,
	      message: "Not Found"
	    });
	}

      res.status(200).json({
        statusCode: 200,
	message: "Created Success",
	data: logged
      });
    });
  }

  verifyCode() {
    return catchError(async (req, res) => {
      const {code} = req.params;
      const userVerified = await userService.verifyCode(code);

      if(!userVerified)
	res.status(401).json({
          statusCode: 401,
	  message: "Unauthorized"
	});

      res.status(200).json({
        statusCode: 200,
	message: "Verified Success"
      });
    });
  }

  logged() {
    return catchError(async (req, res) => {
      const loggedUser = req.user;

      res.status(200).json({
        statusCode: 200,
	message: "Read Success",
	data: loggedUser
      });
    });
  }
};

module.exports = UserController;
