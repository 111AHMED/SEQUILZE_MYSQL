const bcrypt = require("bcrypt");

const checkPassword = async (plaintextPassword, hashPassword) => {
  const password = await bcrypt.compare(plaintextPassword, hashPassword);
  return password;
};
module.exports = checkPassword;
