const CustomErrorHandler = require("../utils/custom-error-handler");
const AuthValidator = require("../validation/auth.validation");

module.exports = function (req, res, next) {
  const { error } = AuthValidatorValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(
      "Validation error",
      error.details.map((e) => e.message)
    );
  }

  next();
};
