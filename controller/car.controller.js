const BrendSchema = require("../schema/brends.schema");
const CarsSchema = require("../schema/cars.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

const getCarsByBrand = async (req, res, next) => {
  try {
    const { brand_id } = req.params;

    const Brend = await BrendSchema.findById(brand_id);

    if (!Brend) {
      throw CustomErrorHandler.NotFound("Brend not found");
    }

    const car = await CarsSchema.find({ brand_id });
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

const get_one_Car = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await CarsSchema.findById(id);

    if (!car) {
      throw CustomErrorHandler.NotFound("car not found");
    }

    res.status(200).json(car)
  } catch (error) {
    next(error);
  }
};

const addcar = async (req, res, next) => {
  try {
    const {
      car_name,
      price,
      color,
      motor,
      tanirofkasi,
      release_year,
      brand_id,
      distance,
      gearbox,
      description,
    } = req.body;

    const Brend = await BrendSchema.findById(brand_id);

    if (!Brend) {
      throw CustomErrorHandler.NotFound("Brend not found");
    }
    await CarsSchema.create({
      car_name,
      price,
      tanirofkasi,
      color,
      motor,
      release_year,
      brand_id,
      distance,
      gearbox,
      description,
    });

    res.status(201).json({
      message: "car added",
    });
  } catch (error) {
    next(error);
  }
};

const delete_car = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await CarsSchema.findById(id);

    if (!car) {
      throw CustomErrorHandler.NotFound("car not found");
    }
    await CarsSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "car deleted",
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      car_name,
      price,
      color,
      motor,
      tanirofkasi,
      release_year,
      brand_id,
      distance,
      gearbox,
      description,
    } = req.body;
    const car = await CarsSchema.findById(id);

    if (!car) {
      throw CustomErrorHandler.NotFound("car not found");
    }

    await CarsSchema.findByIdAndUpdate(id, {
      car_name,
      price,
      color,
      motor,
      tanirofkasi,
      release_year,
      brand_id,
      distance,
      gearbox,
      description,
    });

    res.status(200).json({
      message: " car updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addcar,
  updateCar,
  getCarsByBrand, 
  delete_car,
  get_one_Car,
};
