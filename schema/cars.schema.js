const { Schema, model } = require("mongoose");

const Cars = new Schema(
  {
    car_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/^[a-zA-Z\s]+$/, "Faqat harf kiriting"],
      minlength: [3, "Kamida 3 ta harf kiriting"],
    },

    brand_id: {
      type: Schema.ObjectId,
      ref: "Brend",
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    tanirofkasi: {
      type: String,
      trim: true,
      required: true,
      enum: {
        values: ["ha", "yoq"],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`,
      },
    },

    motor: {
      type: String,
      required: true,
    },

    release_year: {
      type: Number,
      required: true,
      max: [
        new Date().getFullYear(),
        "Avtomobil kelajak yilida bo'lishi mumkin emas",
      ],
      min: [1900, "Yil noto'g'ri Faqat 1900 gacha mumkin"],
    },

    color: {
      type: String,
      required: true,
      trim: true,
      enum: {
        values: ["black", "white", "gray", "red", "blue", "silver", "green"],
        message: `{VALUE} bunday rang mavjud emas`,
      },
      lowercase: true,
      match: [/^[a-zA-Z]+$/, "Rang faqat harflardan iborat bo'lishi kerak"],
    },

    distance: {
      type: Number,
      required: true,
    },

    gearbox: {
      type: String,
      enum: {
        values: ["avtomat karobka", "mexanik"],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`,
      },
      required: true,
    },

    description: {
      type: String,
      required: true,
       maxlength: [400, "Faqat 400 ta harfga mumkin"],
      minlength: [10, "Kamida 10 ta belgi bo'lsin"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CarsSchema = model("Cars", Cars);

module.exports = CarsSchema
