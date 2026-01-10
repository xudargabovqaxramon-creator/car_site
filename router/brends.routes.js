const { Router } = require("express");
const {
  get_Brends,
  get_one_Brends,
  add_Brend,
  update_Brends,
  delete_brend,
} = require("../controller/brend.controller");
const authorization = require("../middleware/authorization");
const brendValidationMiddleware = require("../middleware/brend.validation.middleware");
const roleCheck = require("../middleware/role-check");
const BrendRouter = Router();



BrendRouter.get("/get_brends", get_Brends);
BrendRouter.get("/get_one_brend/:id", get_one_Brends);
BrendRouter.post("/add_brend",authorization,roleCheck,  brendValidationMiddleware, add_Brend);
BrendRouter.put("/update_brend/:id", authorization,roleCheck, brendValidationMiddleware,update_Brends);
BrendRouter.delete("/delete_brend/:id",authorization,roleCheck, delete_brend);

module.exports = BrendRouter;
