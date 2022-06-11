const jwt = require("jsonwebtoken");
let { PRIVATE_KEY } = require("../const");

const generateToken = (id) => {
  // console.log("qsds", id);
  const token = jwt.sign(id, PRIVATE_KEY);
  // console.log(id);
  return token;
};
module.exports = generateToken;
