var winston = require("winston");
var expressWinston = require("express-winston");

var options = {
  file: {
    level: "info",
    name: "file.info",
    filename: "./logs/info.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
  errorFile: {
    level: "error",
    name: "file.error",
    filename: "./logs/error.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 100,
    colorize: true,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

//infoLogger
const infoLogger = expressWinston.logger({
  transports: [
    // console info
    //   new winston.transports.Console(options.console),
    //   new winston.transports.File(options.errorFile),
    new winston.transports.File(options.file),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.prettyPrint(),
    winston.format.colorize(),
    winston.format.json()
  ),
});

// errorLogger
const errorLogger = expressWinston.errorLogger({
  transports: [
    // console error
    // new winston.transports.Console(options.console),
    // new winston.transports.Console(),
    new winston.transports.File(options.errorFile),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.prettyPrint(),
    winston.format.colorize(),
    winston.format.json()
  ),
});

module.exports = {
  infoLogger,
  errorLogger,
};
