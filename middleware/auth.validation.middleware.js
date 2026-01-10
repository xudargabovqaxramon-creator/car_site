const CustomErrorHandler = require("../utils/custom-error-handler")
const {AuthValidator} = require("../validation/auth.validation")
module.exports = function (req, res, next) {
    const {error}= AuthValidator(req.body)

    if (error) {
        throw CustomErrorHandler.BadRequest(error.message)
    }

    next()
}