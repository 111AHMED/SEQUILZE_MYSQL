const jwt = require("jsonwebtoken");
let { PRIVATE_KEY, JWT_EXPIRES_IN } = require("../const");

const generateToken = (id) => {
  // console.log("qsds", id);
  // return jwt.sign(id, PRIVATE_KEY);
  // // console.log(id);
  // return token;
  return jwt.sign({ id: id }, PRIVATE_KEY, { expiresIn: JWT_EXPIRES_IN });
};
module.exports = generateToken;
