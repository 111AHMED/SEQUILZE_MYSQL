let { NODE_ENV } = require("./const");

const express = require("express");
var app = express();
// //fs create folder log if not existe
// const fs = require("fs");
const { sequelize, User } = require("./models");

//cors to allow pass data
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Morgan dev dep for
if (NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}
// Winston logger in production loger info file
if (NODE_ENV !== "development") {
  const logger = require("./config/winston");
  app.use(logger.infoLogger);
}
//all routes here
app.use("/api/users", require("./routes/usersRoutes"));
// testing route
app.get("/", async (req, res) => {
  const datas = await User.findAll();
  console.log(datas);
  return res.json({ data: datas, message: "Welcome ." });
});
//Router not define
app.use((req, res) => {
  let success = false;
  let statuss = 500;
  res.status(statuss).json({
    statuss,
    success,
    message: "404 PAGE NOT FOUND",
  });
});
// Winston logger in production loger info file
if (NODE_ENV !== "development") {
  const logger = require("./config/winston");
  app.use(logger.errorLogger);
}
module.exports = app;
