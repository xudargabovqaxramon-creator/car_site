const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../utils/custom-error-handler");
module.exports = function (req, res, next) {
  try {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      throw CustomErrorHandler.UnAuthorized("Access token not found");
    }
    const decode = jwt.verify(access_token, process.env.SECRETKY);
    req.user = decode;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(CustomErrorHandler.UnAuthorized("Token noto'g'ri"));
    }
    if (error.name === "TokenExpiredError") {
      return next(CustomErrorHandler.UnAuthorized("Token muddati tugagan"));
    }
    next(error);
  }
};
