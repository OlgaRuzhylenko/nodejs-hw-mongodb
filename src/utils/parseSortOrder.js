import { SORT_ORDER } from '../constants/contacts-constants.js';

export const parseSortOrder = (sortOrder) => {
  const isKnown = Object.values(SORT_ORDER).includes(sortOrder);
  if (isKnown) {
    return sortOrder;
  }
  return SORT_ORDER.ASC;
};
