const User = require("../models/User.model");
const EmailCode = require("../models/EmailCode.model");
const CRUDService = require("./CRUD.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("./sendEmail.service.js");

class UserService extends CRUDService {
  constructor() {
    super(User);
  }

  async create(data) {
    const encrypted = await bcrypt.hash(data.password, 10);
    const createdUser = await User.create({...data, password: encrypted});

    const code = crypto.randomBytes(32).toString("hex");

    await sendEmail({
      to: createdUser.email,
      subject: "Verify your account",
      html: `<h3>Click on this link: <a href="${data.frontUrlBase}/users/verify_email/${code}">${data.frontUrlBase}/users/verify_email/${code}</a> for verify your account</h3>`
    });

    const createdVerification = await EmailCode.create({code, userId: createdUser.id});

    return createdUser;
  }

  async login(email, password) {
    const logged = await User.findOne({where: {email}});
    
    if(!logged) return 404;

    const isValid = await bcrypt.compare(password, logged.password);
    
    if(!isValid) return 403;
     
    if(!logged.isVerified) return 401;
    
    const TOKEN = jwt.sign(
      {user: logged},
      process.env.TOKEN_SECRET,
      {expiresIn: "2d"}
    );

    return TOKEN;
  }

  async verifyCode(code) {
    const emailVerified = await EmailCode.findOne({where: {code}});

    if(!emailVerified) return null;

    const userVerified = await User.findByPk(emailVerified.userId);
 
    if(!userVerified) return null;
    await User.update({isVerified: true}, {where: {id: emailVerified.userId}});
    await EmailCode.destroy({where: {id: emailVerified.id}});

    return userVerified;
  }
};

module.exports = UserService;
