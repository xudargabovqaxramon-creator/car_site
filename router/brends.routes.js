const { Router } = require("express");
const {
  get_Brends,
  get_one_Brends,
  add_Brend,
  update_Brends,
  delete_brend,
} = require("../controller/brend.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleCheckMiddleware = require("../middleware/role-check.middleware");
const BrendRouter = Router();

BrendRouter.get("/get_brends", get_Brends);
BrendRouter.get("/get_one_brend/:id", get_one_Brends);
BrendRouter.post("/add_brend", authMiddleware, roleCheckMiddleware, add_Brend);
BrendRouter.put(
  "/update_brend/:id",
  authMiddleware,
  roleCheckMiddleware,
  update_Brends
);
BrendRouter.delete(
  "/delete_brend/:id",
  authMiddleware,
  roleCheckMiddleware,
  delete_brend
);

module.exports = BrendRouter;
