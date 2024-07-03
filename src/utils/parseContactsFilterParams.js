import { contactTypeList } from '../constants/contacts-constants.js';

const parsedBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (!['true', 'false'].includes(value)) return;

  const parsedValue = Boolean(value);
  return parsedValue;
};

export const parseContactsFilterParams = ({ type, isFavourite }) => {
  const parsedType = contactTypeList.includes(type) ? type : null;
  const parsedFavourite = parsedBoolean(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedFavourite,
  };
};
