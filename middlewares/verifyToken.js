const jwt = require("jsonwebtoken");

let { PRIVATE_KEY } = require("../const");

const { sequelize, User } = require("../models");

/**
 * Verify Token
 * @param {string} token
 * @returns {string} decoded
 */
const verifyToken = async (req, res, next) => {
  const success = false;
  let status = 401;

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      status = 400;
      return res
        .status(status)
        .json({ status, success, message: "No token provided" });
    }

    // console.log("tokennnnn", req.headers.authorization);
    const token = authHeader.split(" ")[1];
    if (!token) {
      status = 400;
      return res
        .status(status)
        .json({ status, success, message: "No token provided" });
    }

    const decoded = jwt.verify(token, PRIVATE_KEY);

    if (!decoded) {
      return res
        .status(status)
        .json({ status, success, error: "Invalid token provided" });
    }
    const rows = await User.findOne({
      where: { id: decoded },
      // attributes: { exclude: ["password"] },
    });
    console.log(rows);
    // console.log("rows", rows);
    if (!rows) {
      return res
        .status(400)
        .json({ status, success, error: "Invalid token provided" });
    }
    // inject current to user to route principal
    req.currentMarket = rows;

    next();
  } catch (error) {
    return res.status(status).json({ status, success, error: error.message });
  }
};

module.exports = verifyToken;
