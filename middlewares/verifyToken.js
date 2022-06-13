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
      status = 401;
      return res
        .status(status)
        .json({ status, success, message: "Unauthorizeds" });
    }

    // console.log("tokennnnn", req.headers.authorization);
    const token = authHeader.split(" ")[1];
    if (!token) {
      status = 401;
      return res
        .status(status)
        .json({ status, success, message: "Unauthorizedd" });
    }

    const decoded = jwt.verify(token, PRIVATE_KEY);

    if (!decoded) {
      return res
        .status(status)
        .json({ status, success, error: "Unauthorizede" });
    }
    const rows = await User.findOne({
      where: { id: decoded.id },
      attributes: { exclude: ["password"] },
    });
    console.log(decoded);
    if (!rows) {
      return res.status(401).json({ status, success, error: "UnauthorizedS" });
    }
    // inject current to user to route principal
    req.currentMarket = rows;
    // console.log(" req.currentMarket", req.currentMarket);

    next();
  } catch (error) {
    return res.status(status).json({ status, success, error: error.message });
  }
};

module.exports = verifyToken;
