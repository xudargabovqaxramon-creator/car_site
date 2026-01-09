const BrendSchema = require("../schema/brends.schema");
const CarsSchema = require("../schema/cars.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

const get_Brends = async (req, res, next) => {
  try {
    const foundedBrend = await BrendSchema.find();
    res.status(200).json(foundedBrend);
  } catch (error) {
    next(error);
  }
};

const get_one_Brends = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Brend = await BrendSchema.findById(id);

    if (!Brend) {
      throw CustomErrorHandler.NotFound("Brend not found");
    }
    const cars = await CarsSchema.findById({bre})
  } catch (error) {
    next(error);
  }
};

const add_Brend = async (req, res, next) => {
  try {
    const { brand_name, logo } = req.body;
    await BrendSchema.create({ brand_name, logo });

    res.status(201).json({
      message: "Brend created",
    });
  } catch (error) {
    next(error);
  }
};

const delete_brend = async (req, res, next) => {
  try {
    const { id } = req.params;
    const Brend = await BrendSchema.findById(id);

    if (!Brend) {
      throw CustomErrorHandler.NotFound("Brend not found");
    }
    await BrendSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "Brend deleted",
    });
  } catch (error) {
    next(error);
  }
};

const update_Brends = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { brand_name, logo } = req.body;
    const Brend = await BrendSchema.findById(id);

    if (!Brend) {
      throw CustomErrorHandler.NotFound("Brend not found");
    }

    await BrendSchema.findByIdAndUpdate(id, {
      brand_name: brand_name,
      logo: logo,
    });

    res.status(200).json({
      message: " Brend updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add_Brend,
  update_Brends,
  get_Brends,
  delete_brend,
  get_one_Brends
};
