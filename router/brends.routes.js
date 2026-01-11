const { Router } = require("express");
const {
  get_Brends,
  get_one_Brends,
  add_Brend,
  update_Brends,
  delete_brend,
} = require("../controller/brend.controller");
const authorization = require("../middleware/authorization");
const roleCheck = require("../middleware/role-check");
const validatorbrend = require("../middleware/brend.validation.middleware")
const BrendRouter = Router();



BrendRouter.get("/get_all_brend", get_Brends);
BrendRouter.get("/get_one_brend/:id", get_one_Brends);
BrendRouter.post("/add_brend",authorization,roleCheck, validatorbrend , add_Brend);
BrendRouter.put("/update_brend/:id", authorization,roleCheck, validatorbrend,update_Brends);
BrendRouter.delete("/delete_brend/:id",authorization,roleCheck, delete_brend);

module.exports = BrendRouter;
