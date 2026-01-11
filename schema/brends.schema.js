const { Schema, model } = require("mongoose");

const Brend = new Schema(
  {
    brend_name : {
        type: String,
        required: true,
        trim: true,
        unique:true,
        minlength:[3, "Kamida 3 ta harf kiriting"],
        match: [/^[a-zA-Z]+$/, "Faqat harf  kiriting"]
    },
    logo : {
        type : String,
        required: true,
        minlength: [5, "Kamida 5 ta harfdan iborat bolishi kerak"]
    }
  },
  {
    versionKey:false,
    timestamps:true
  }
);


const BrendSchema = model("Brend", Brend);

module.exports = BrendSchema;
