const {Router} = require("express")
const { get_one_img, add_img, update_imgs, delete_img } = require("../controller/car-img.controller")
const upload = require("../utils/multer")
const ImgRouter= Router()


ImgRouter.get("/get_one_img/:id",upload.single("img"), get_one_img)
ImgRouter.post("/add_img" , add_img)
ImgRouter.put("/update_img/:id" ,  update_imgs)
ImgRouter.delete("/delete_img/:id" , delete_img)

module.exports = ImgRouter