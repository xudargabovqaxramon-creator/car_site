const { createLogger, format, transports } = require("winston");
require("winston-mongodb");

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/all.log" }),
    new transports.MongoDB({
      db: process.env.MONGO_URI, 
      collection: "logs",
      level: "error",
      options: { useUnifiedTopology: true }
    })
  ]
});

module.exports = logger;
