const express = require("express");
const router = express.Router();
const { sequelize, User } = require("../models");
// helpers
const hash = require("../helpers/hashPassword");
const token = require("../helpers/getToken");
//Joi Backend validate
const { signupSchema } = require("../helpers/validateUser");

const findAllUsers = async (req, res) => {
  console.log(req.currentMarket);
  let success = true;
  let status = 200;
  try {
    const datas = await User.findAll({ attributes: { exclude: ["password"] } });
    console.log(datas);
    return res.json({
      status,
      success,
      message: "All users ",
      current: req.currentMarket,
      data: datas,
    });
  } catch (error) {
    return res.status(status).json({ status, success, error: error.message });
  }
};

const signup = async (req, res) => {
  console.log("first");
  let success = true;
  let status = 201;
  // console.log(req.body);
  //Validate req data with joi
  const { error } = signupSchema(req.body);

  if (error) {
    const errorMessage = error.details[0].message;

    return res.status(400).json({ status: 400, success, error: errorMessage });
  }
  try {
    const userInfo = req.body;
    const { firstName, lastName, email, password } = userInfo;
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(409).json({
        status: 409,
        success,
        error: "User with this email already exists.",
      });
    }
    // console.log(userInfo);
    const hashPassword = await hash(password);

    const cols = {
      firstName,
      lastName,
      email,
      //   password: await bcrypt.hash(password, 10),
    };
    cols["password"] = hashPassword;

    const createUser = await User.create(cols);
    const { dataValues } = createUser;

    // console.log(User.id);
    let data = createUser;

    let tokens = token(data.id);

    res.status(status).json({
      status,
      success,
      message: "User created successfully",
      data,
      tokens,
    });
  } catch (error) {
    return res.status(status).json({ status, success, error: error.message });
  }
};
module.exports = { findAllUsers, signup };
