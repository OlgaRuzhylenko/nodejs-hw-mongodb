import Joi from 'joi';
import {
  contactTypeList,
  stringLength,
} from '../constants/contacts-constants.js';

export const contactsAddSchema = Joi.object({
  name: Joi.string().pattern(stringLength).required(),
  phoneNumber: Joi.string().pattern(stringLength).required(),
  email: Joi.string().pattern(stringLength),
  isFavourite: Joi.boolean().required(),
  contactType: Joi.string()
    .required()
    .valid(...contactTypeList),
});
