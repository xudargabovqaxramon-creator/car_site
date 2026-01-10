const CustomErrorHandler = require("../utils/custom-error-handler");

module.exports = (err, req, res, next) => {
  if (err instanceof CustomErrorHandler) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  res.status(500).json({
    message: err.message || "Internal server error",
  });
};
