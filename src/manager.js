const express = require("express");
const manager = express();
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

manager.use(express.json());
manager.use(helmet({
  crossOriginResourcePolicy: false,
}));
manager.use(cors());
router(manager);

manager.use(errorHandler);

module.exports = manager;
