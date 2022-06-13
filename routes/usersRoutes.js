const express = require("express");
const router = express.Router();
const { sequelize, User } = require("../models");
// Controllers import
const { findAllUsers, signup, signin } = require("../controllers/usersContro");
//Middlewres
const verifyToken = require("../middlewares/verifyToken");
const isAdmin = require("../middlewares/isAdmin");
//Routes
router.get("/all", verifyToken, isAdmin, findAllUsers);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
