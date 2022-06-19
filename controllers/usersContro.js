require("express-async-errors");
const express = require("express");

const router = express.Router();
const { sequelize, User } = require("../models");
// helpers
const hash = require("../helpers/hashPassword");
const checkPassword = require("../helpers/checkPassword");

const token = require("../helpers/getToken");
//Joi Backend validate
const { signupSchema, signinSchema } = require("../helpers/validateUser");

const findAllUsers = async (req, res) => {
  console.log("req.currentMarket");
  let success = true;
  let status = 200;
  try {
    const datas = await User.findAll({ attributes: { exclude: ["password"] } });

    console.log("sqdqsdqs", datas[0].toJSON());
    return res.json({
      status,
      success,
      message: "All users ",
      currentUser: req.currentMarket,
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
    console.log(data);
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
const signin = async (req, res) => {
  console.log("signin");
  let success = true;
  let status = 200;
  // console.log(req.body);
  //Validate req data with joi
  const { error } = signinSchema(req.body);

  if (error) {
    const errorMessage = error.details[0].message;

    return res.status(400).json({ status: 400, success, error: errorMessage });
  }
  try {
    const userInfo = req.body;
    const { email, password } = userInfo;

    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (user) {
      const password_valid = await checkPassword(password, user.password);
      if (password_valid) {
        let tokens = token(user.id);
        res.status(status).json({
          status,
          success,
          message: "Login successfully",
          data: user,
          tokens,
        });
      } else {
        res.status(400).json({ error: "Password Incorrect" });
      }
    } else {
      res.status(404).json({ error: "User does not exist" });
    }
  } catch (error) {
    return res.status(status).json({ status, success, error: error.message });
  }
};
module.exports = { findAllUsers, signup, signin };
