const connect = require("../services/connection.service");
require("../models");
require("../models/User.model");

async function main() {
  try{
    await connect.sync();
    process.exit();
  }catch(err) {
    throw new Error(err);
  }
}

main();
