
const { Schema, model } = require("mongoose");

const img = new Schema(
  {
    car_id : {
        type: String,
        ref: "Car",
        required: true,
    },
    user_id : {
        type :Schema.ObjectId,
        ref: "Auth",
        required: true,
    },
    img_url: {
        type:String,
        required:true
    }
  },
  {
    versionKey:false,
    timestamps:true
  }
);

const imgSchema = model("img", img);

module.exports = imgSchema;
