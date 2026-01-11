const Joi = require("joi");

exports.BrendValidator = function (data) {
  const schema = Joi.object({
    brend_name: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .trim()
      .min(2)
      .max(50)
      .required().messages({
        "any.required": " brend_name kiritish majburiy"
      }),
    logo: Joi.string().uri().required(),
  });

  return schema.validate(data, { abortEarly: false });
};
