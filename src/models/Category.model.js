const {DataTypes} = require("sequelize");
const sequelize = require("../services/connection.service");
const Category = sequelize.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Category;
