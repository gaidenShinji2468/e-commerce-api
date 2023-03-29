const {DataTypes} = require("sequelize");
const sequelize = require("../services/connection.service");
const Product = require("./Product.model");
const ProductImg = sequelize.define("productImg", {
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = ProductImg;
