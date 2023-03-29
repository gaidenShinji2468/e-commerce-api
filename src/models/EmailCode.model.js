const {DataTypes} = require("sequelize");
const sequelize = require("../services/connection.service");
const User = require("./User.model");
const EmailCode = sequelize.define("email_code", {
  code: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = EmailCode;
