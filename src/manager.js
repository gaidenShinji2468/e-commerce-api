const express = require("express");
const manager = express();
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

manager.use(express.json());
manager.use(helmet({
  crossOriginResourcePolicy: false,
}));
manager.use(cors());
manager.use(express.static(path.join(__dirname, "public")));
router(manager);

manager.use(errorHandler);

module.exports = manager;
