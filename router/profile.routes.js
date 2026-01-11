const {Router} = require("express")
// const authValidationMiddleware = require("../middleware/auth.validation.middleware")
const { updateMe, logout, getMe, changepassword, forgotPassword } = require("../controller/user-profile.controller")
const authorization = require("../middleware/authorization")
const { toggleLike, getMyLikes } = require("../controller/like.controller")
const profileRouter= Router()


profileRouter.put("/forgot_password",authorization, forgotPassword)
profileRouter.put("/change_password",authorization,changepassword)
profileRouter.get("/get_me",authorization,getMe)
profileRouter.get("/logout", logout)
profileRouter.post("/like/:id",authorization, toggleLike)
profileRouter.get("/get_my_like",authorization, getMyLikes)
profileRouter.put("/update_me",authorization, updateMe)

module.exports = profileRouter