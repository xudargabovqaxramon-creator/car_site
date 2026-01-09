const CustomErrorHandler = require("../utils/custom-error-handler");

module.exports = function (req, res, next) {
  try {
    const { role } = req.user;

    if (role !== "admin" && role !== "superadmin") {
      throw CustomErrorHandler.Forbidden("Bu amal uchun ruxsat yoq");
    }

    next();
  } catch (error) {
    next(error);
  }
};
