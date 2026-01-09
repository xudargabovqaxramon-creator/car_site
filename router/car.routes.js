const {Router} = require("express")
const { addcar, updateCar, delete_car, getCarsByBrand, get_one_Car } = require("../controller/car.controller")
const CarRouter= Router()


CarRouter.get("/get_cars",getCarsByBrand)
CarRouter.get("/get_one_car",get_one_Car)
CarRouter.post("/add_car",addcar)
CarRouter.put("/update_car",updateCar)
CarRouter.delete("/delete_car", delete_car)

module.exports = CarRouter