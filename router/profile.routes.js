const {Router} = require("express")
// const authValidationMiddleware = require("../middleware/auth.validation.middleware")
const { updateMe, logout, getMe, changepassword, forgotPassword } = require("../controller/user-profile.controller")
const profileRouter= Router()


profileRouter.put("/forgot_password",forgotPassword)
profileRouter.put("/change_password",changepassword)
profileRouter.get("/get_me",getMe)
profileRouter.get("/logout", logout)
profileRouter.put("/update_me", updateMe)

module.exports = profileRouter