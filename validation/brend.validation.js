const Joi = require("joi");

exports.BrendValidator = function (data) {
  const schema = Joi.object({
    brand_name: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .trim()
      .min(2)
      .max(50)
      .required()
      .messages({
        "string.pattern.base": "Brand nomi faqat harflardan iborat bo'lishi kerak",
        "string.min": "Brand nomi kamida 2 ta harf bo'lishi kerak",
        "string.max": "Brand nomi 50 ta harfdan oshmasligi kerak",
        "string.empty": "Brand nomi bo'sh bo'lishi mumkin emas",
      }),

    logo: Joi.string()
      .uri()
      .required()
      .messages({
        "string.uri": "Logo to'g'ri URL bo'lishi kerak",
        "string.empty": "Logo bo'sh bo'lishi mumkin emas",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};
