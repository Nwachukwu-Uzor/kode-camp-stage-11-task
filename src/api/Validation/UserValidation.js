import Joi from "joi";
import JoiPasswordComplexity from "joi-password-complexity";

const complexityOption = {
  min: 8,
  max: 50,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
};

export const userCreateSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .min(7)
    .max(255)
    .email({ tlds: { allow: false } }),
  password: JoiPasswordComplexity(complexityOption).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
  role: Joi.string().min(4).max(10),
});
