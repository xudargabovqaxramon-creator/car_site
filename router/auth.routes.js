const {Router} = require("express")
const { register, Login, verify, logout, resendCode } = require("../controller/auth.controller")
const refreshToken = require("../middleware/refresh-token")
const authValidationMiddleware = require("../middleware/auth.validation.middleware")
const AuthRouter= Router()


AuthRouter.post("/registr",authValidationMiddleware, register)
AuthRouter.post("/login",Login)
AuthRouter.post("/verify",verify)
AuthRouter.get("/refresh",refreshToken)
AuthRouter.post("/resend_otp", resendCode)

module.exports = AuthRouter