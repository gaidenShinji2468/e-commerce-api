const {DataTypes} = require("sequelize");
const sequelize = require("../services/connection.service");
const User = require("./User.model");
const Product = require("./Product.model");
const Purchase = sequelize.define("purchase", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Purchase;
