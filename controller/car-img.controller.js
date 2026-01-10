
const imgSchema = require("../schema/car-img.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");


const get_one_img = async (req, res, next) => {
  try {
    const { id } = req.params;
    const img = await imgSchema.findById(id);

    if (!img) {
      throw CustomErrorHandler.NotFound("img not found");
    }
    res.status(200).json()
  } catch (error) {
    next(error);
  }
};

const add_img = async (req, res, next) => {
  try {
    const { car_id } = req.body;
    const img = req.file
    await imgSchema.create({car_id, img_url:img, user_id: req.user.id});

    res.status(201).json({
      message: "added img",
    });
  } catch (error) {
    next(error);
  }
};

const delete_img = async (req, res, next) => {
  try {
    const { id } = req.params;
    const img = await imgSchema.findById(id);

    if (!img) {
      throw CustomErrorHandler.NotFound("img not found");
    }
    await imgSchema.findByIdAndDelete(id);

    res.status(200).json({
      message: "img deleted",
    });
  } catch (error) {
    next(error);
  }
};

const update_imgs = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {  car_id, img } = req.body;
    const imgs = await imgSchema.findById(id);

    if (!imgs) {
      throw CustomErrorHandler.NotFound("img not found");
    }

    await imgSchema.findByIdAndUpdate(id, {
       car_id, img_url: img , user_id:req.user.id
    });

    res.status(200).json({
      message: " img updated",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
get_one_img,
add_img,
delete_img,
update_imgs
};
