const {Router} = require("express")
const { addcar, updateCar, delete_car, getCarsByBrand, get_one_Car } = require("../controller/car.controller")
const roleCheckMiddleware = require("../middleware/role-check.middleware")
const authMiddleware = require("../middleware/auth.middleware")
const CarRouter= Router()


CarRouter.get("/get_cars",getCarsByBrand)
CarRouter.get("/get_one_car/:id",get_one_Car)
CarRouter.post("/add_car",authMiddleware ,roleCheckMiddleware, addcar)
CarRouter.put("/update_car/:id",authMiddleware ,roleCheckMiddleware, updateCar)
CarRouter.delete("/delete_car/:id",authMiddleware ,roleCheckMiddleware, delete_car)

module.exports = CarRouter