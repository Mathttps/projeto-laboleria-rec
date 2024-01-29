import Joi from "joi"

export const clientsSchema = Joi.object({
  name: Joi.string().min(2).required(),
  address:Joi.string().required(),
  phone: Joi.string().min(10).max(11).pattern(/^\d+$/).required(),

})