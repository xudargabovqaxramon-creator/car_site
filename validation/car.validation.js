const Joi = require("joi");

exports.CarsValidator = function(data){
  const schema = Joi.object({car_name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)
    .min(3)
    .required()
    .messages({
      "string.min": "Kamida 3 ta harf kiriting",
      "string.pattern.base": "Faqat harf va bo'sh joy kiriting",
    }),

  brand_id: Joi.string().max(24).required(),

  price: Joi.number().required().messages({
    "number.base": "Narx faqat raqam bo'lishi kerak"
  }),

  tanirofka: Joi.string()
    .valid("ha", "yoq")
    .required()
    .messages({
      "any.only": `{#value} bunday qiymat qabul qilinmaydi`,
    }),

  motor: Joi.string().required(),

  release_year: Joi.number()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      "number.min": "Yil 1900 dan kichik bo'lishi mumkin emas",
      "number.max": "Avtomobil kelajak yilida bo'lishi mumkin emas",
    }),

  color: Joi.string()
    .valid("black", "white", "gray", "red", "blue", "silver", "green")
    .required()
    .messages({
      "any.only": `{#value} bunday rang mavjud emas`,
      "string.empty": "Rang kiritilishi shart",
    }),

  distance: Joi.number().required().messages({
    "number.base": "Masofa faqat raqam bo'lishi kerak",
    "any.required": "Masofa kiritilishi shart",
  }),

  gearbox: Joi.string()
    .valid("avtomat karobka", "mexanik")
    .required()
    .messages({
      "any.only": `{#value} bunday qiymat qabul qilinmaydi`
    }),

  description: Joi.string()
    .min(10)
    .max(400)
    .required()
    .messages({
      "string.min": "Kamida 10 ta belgi bo'lsin",
      "string.max": "Faqat 400 ta harfga mumkin"
    }),
  })
    return schema.validate(data, { abortEarly: false });
}
