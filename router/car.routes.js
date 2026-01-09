const {Router} = require("express")
const { addcar, updateCar, delete_car, getCarsByBrand, get_one_Car } = require("../controller/car.controller")
const carMiddleware = require("../middleware/car.middleware")
const authorization = require("../middleware/authorization")
const CarRouter= Router()


CarRouter.get("/get_cars",getCarsByBrand)
CarRouter.get("/get_one_car/:id",get_one_Car)
CarRouter.post("/add_car" ,authorization, carMiddleware, addcar)
CarRouter.put("/update_car/:id" ,authorization, carMiddleware, updateCar)
CarRouter.delete("/delete_car/:id" ,authorization,  delete_car)

module.exports = CarRouter