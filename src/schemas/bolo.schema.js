import Joi from "joi"

export const cakeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  price:Joi.number().min(0.01).required(),
  image: Joi.string().uri().required(),
  description: Joi.string(),
  flavourId:Joi.number().integer().required()
})