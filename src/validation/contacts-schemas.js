import Joi from 'joi';
import {
  contactTypeList,
  stringLength,
} from '../constants/contacts-constants.js';

//додати мінімум і максимум символів у рядках!!!
export const contactsAddSchema = Joi.object({
  name: Joi.string().pattern(stringLength).required(),
  phoneNumber: Joi.string().pattern(stringLength).required(),
  email: Joi.string().pattern(stringLength),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string().valid(...contactTypeList),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string().pattern(stringLength),
  phoneNumber: Joi.string().pattern(stringLength),
  email: Joi.string().pattern(stringLength),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...contactTypeList),
});
