const {DataTypes} = require("sequelize");
const sequelize = require("../services/connection.service");
const User = require("./User.model");
const Product = require("./Product.model");
const Cart = sequelize.define("cart", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Cart;
