const connect = require("./services/connection.service");
require("dotenv").config();
const manager = require("./manager");
require("./models");

async function main() {
  const PORT = process.env.PORT || 8080;

  try{
    await connect.sync();
    console.log("Database connected successfully");
    manager.listen(PORT, () => {
      console.log(`Server runs on port ${PORT}`);
    });
  }catch(err) {
    throw new Error(err);
  }
}

main();
