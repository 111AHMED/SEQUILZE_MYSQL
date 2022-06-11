require("dotenv").config();
let { PORT } = require("./const");
//chalk used for color message version support  require chalk@4.1.2
const chalk = require("chalk");
//import app module from app js
const app = require("./app");
//import sequelize
const { sequelize } = require("./models");
PORT = PORT || 5000;
app.listen(PORT, async (err) => {
  try {
    // sync will be connect with permesion update create row table
    // await sequelize.sync({ alter: true });
    //    authenticate used to just connect to db
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  err
    ? console.log(err)
    : console.log(chalk.blue(`app listening on port ${chalk.blue(PORT)}!`));
});
