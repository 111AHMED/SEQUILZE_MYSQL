const express = require("express");
const router = express.Router();
const { sequelize, User } = require("../models");
// Controllers import
const { findAllUsers, signup } = require("../controllers/usersContro");
//Middlewres
const verifyToken = require("../middlewares/verifyToken");

//Routes
router.post("/all", verifyToken, findAllUsers);
router.post("/signup", signup);

module.exports = router;
