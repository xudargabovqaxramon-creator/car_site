const CustomErrorHandler = require("../utils/custom-error-handler");
const { BrendValidator } = require("../validation/brend.validation");

module.exports = function (req, res, next) {
  const { error } = BrendValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(
      "Validation error",
      error.details.map((e) => e.message)
    );
  }

  next();
};
