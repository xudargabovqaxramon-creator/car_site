const { Schema, model } = require("mongoose");

const likeSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    car_id: {
      type: Schema.Types.ObjectId,
      ref: "Cars",
      required: true,
    },
  },
  { timestamps: true }
);

likeSchema.index({ user_id: 1, car_id: 1 }, { unique: true });

module.exports = model("Like", likeSchema);
