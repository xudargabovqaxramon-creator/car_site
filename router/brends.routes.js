const {Router} = require("express")
const { get_Brends, get_one_Brends, add_Brend, update_Brends, delete_brend } = require("../controller/brend.controller")
const BrendRouter= Router()


BrendRouter.get("/get_brends",get_Brends)
BrendRouter.get("/get_one_brend",get_one_Brends)
BrendRouter.post("/add_brend",add_Brend)
BrendRouter.put("/update_brend",update_Brends)
BrendRouter.delete("/delete_brend", delete_brend)

module.exports = BrendRouter