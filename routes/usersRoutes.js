const express = require("express");
const router = express.Router();
const { sequelize, User } = require("../models");
// Controllers import
const { findAllUsers, signup } = require("../controllers/usersContro");
//Routes
router.get("/all", findAllUsers);
router.post("/signup", signup);

module.exports = router;
