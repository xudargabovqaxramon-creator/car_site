const Joi = require("joi");

const AuthValidator = Joi.object({
  user_name: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .min(3)
    .required()
    .messages({
      "string.empty": "Ism bo'sh bo'lishi mumkin emas",
      "string.min": "Kamida 3 ta harf kiriting",
      "string.pattern.base": "Faqat harf va raqam kiriting",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .min(15)
    .max(50)
    .required()
    .messages({
      "string.email": "Email noto'g'ri formatda",
      "string.empty": "Email kiritish majburiy",
      "string.min": "Email kamida 15 ta belgidan iborat bo'lishi kerak",
      "string.max": "Email maksimal 50 ta belgidan oshmasligi kerak",
    }),

  password: Joi.string()
    .min(8)
    .required()
    .messages({
      "string.empty": "Parol kiritish majburiy",
      "string.min": "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
    }),

  role: Joi.string()
    .valid("superadmin", "admin", "user")
    .optional()
    .messages({
      "any.only": "{#value} bunday qiymat qabul qilinmaydi",
    }),

});

module.exports = AuthValidator;
