const {Router} = require("express")
const { addcar, updateCar, delete_car, getCarsByBrand, get_one_Car } = require("../controller/car.controller")
const authorization = require("../middleware/authorization")
const carValidationMiddleware = require("../middleware/car.validation.middleware")
const roleCheck = require("../middleware/role-check")
const CarRouter= Router()


CarRouter.get("/get_cars",getCarsByBrand)
CarRouter.get("/get_one_car/:id",get_one_Car)
CarRouter.post("/add_car" ,authorization,roleCheck, carValidationMiddleware, addcar)
CarRouter.put("/update_car/:id" ,authorization,roleCheck, carValidationMiddleware, updateCar)
CarRouter.delete("/delete_car/:id" ,authorization,roleCheck,  delete_car)

module.exports = CarRouter