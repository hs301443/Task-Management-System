import Joi from "joi";

export const createRejectedResonSchema = Joi.object({
  reson: Joi.string().required(),
  points: Joi.number().required(),
});

export const updateRejectedResonSchema = Joi.object({
  reson: Joi.string().optional(),
  points: Joi.number().optional(),
});