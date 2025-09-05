const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../logs/error.log");

const errorLogger = (err, req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${
    req.url
  } - ${err.message}\n`;

  fs.appendFileSync(logFile, log);

  // console.error(err.message);

  res.status(500).json({ error: "Something went wrong, check logs." });
};

module.exports = errorLogger;