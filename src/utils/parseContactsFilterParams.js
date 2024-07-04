import { contactTypeList } from '../constants/contacts-constants.js';

// const parsedBoolean = (value) => {
//   if (typeof value !== 'string') return;
//   if (!['true', 'false'].includes(value)) return;

//   const parsedValue = Boolean(value);
//   return parsedValue;
// };

const parsedBoolean = (isFavourite) => {
  const isBoolean = isFavourite === 'true' || isFavourite === 'false';

  if (!isBoolean) return;

  return isFavourite === 'true' ? true : false;
};


export const parseContactsFilterParams = ({ contactType, isFavourite }) => {
  const parsedType = contactTypeList.includes(contactType) ? contactType : null;
  const parsedFavourite = parsedBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedFavourite,
  };
};
