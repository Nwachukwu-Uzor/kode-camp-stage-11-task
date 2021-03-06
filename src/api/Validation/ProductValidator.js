import Joi from "joi";

export const createSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  category: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(10).required(),
});

export const updateSchema = Joi.object({
  name: Joi.string().min(5).max(30),
  category: Joi.string().min(5).max(50),
  description: Joi.string().min(10),
  price: Joi.number().min(10),
});
