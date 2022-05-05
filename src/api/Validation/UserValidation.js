const Joi = require("joi");

const userCreateSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .min(7)
    .email({ tlds: { allow: false } }),
  password: Joi.string().min(7),
});

module.exports = {
  userCreateSchema,
};
