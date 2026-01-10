const Joi = require("joi");

exports.AuthValidator = function (data) {
  const schema = Joi.object({
    user_name: Joi.string()
      .pattern(/^[a-zA-Z0-9]+$/)
      .min(3)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .min(15)
      .max(50)
      .required(),

    password: Joi.string().min(8).required(),
    role: Joi.string().valid("superadmin", "admin", "user").optional(),
  });

  return schema.validate(data, { abortEarly: true });
};
