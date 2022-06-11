const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  PORT,
  PRIVATE_KEY,
};
