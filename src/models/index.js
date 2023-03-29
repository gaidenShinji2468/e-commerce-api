const ProductImg = require("./ProductImg.model");
const Product = require("./Product.model");
const Cart = require("./Cart.model");
const User = require("./User.model");
const Purchase = require("./Purchase.model");
const EmailCode = require("./EmailCode.model");
const Category = require("./Category.model");

ProductImg.belongsTo(Product);
Product.hasMany(ProductImg);

Cart.belongsTo(User);
User.hasMany(Cart);

Cart.belongsTo(Product);
Product.hasMany(Cart);

Purchase.belongsTo(User);
User.hasMany(Purchase);

Purchase.belongsTo(Product);
Product.hasMany(Purchase);

EmailCode.belongsTo(User);
User.hasOne(EmailCode);

Product.belongsTo(Category);
Category.hasMany(Product);
