const CustomErrorHandler = require("../utils/custom-error-handler");
const {CarsValidator} = require("../validation/car.validation")
module.exports = function (req, res, next) {
  const { error } = CarsValidator(req.body)

  if (error) {
    throw CustomErrorHandler.BadRequest(
      "Validation error",
      error.details.map((e) => e.message)
    );
  }

  next();
};
