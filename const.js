const dotenv = require("dotenv");
dotenv.config();
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  PORT,
  PRIVATE_KEY,
  NODE_ENV,
};
