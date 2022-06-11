const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const passwords = await bcrypt.hash(password, salt);
  return passwords;
};
module.exports = hashPassword;
