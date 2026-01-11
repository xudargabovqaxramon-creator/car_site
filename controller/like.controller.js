const likeSchema = require("../schema/like.schema");
const CarsSchema = require("../schema/cars.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

const toggleLike = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const carId = req.params.id;

    const car = await CarsSchema.findById(carId);
    if (!car) {
      throw CustomErrorHandler.NotFound("Car not found");
    }

    const liked = await likeSchema.findOne({
      user_id: userId,
      car_id: carId,
    });

    if (liked) {
      await likeSchema.findByIdAndDelete(liked._id);
      return res.status(200).json({ message: "Unliked" });
    }

    await likeSchema.create({
      user_id: userId,
      car_id: carId,
    });

    res.status(201).json({ message: "Liked" });
  } catch (error) {
    next(error);
  }
};

const getMyLikes = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const likes = await likeSchema.find({ user_id: userId }).populate("car_id");
    res.status(200).json(likes);
  } catch (error) {
    next(error);
  }
};

const getLikeCount = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const count = await likeSchema.countDocuments({ car_id: carId });
    res.status(200).json({ likeCount: count });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  toggleLike,
  getMyLikes,
  getLikeCount
};
