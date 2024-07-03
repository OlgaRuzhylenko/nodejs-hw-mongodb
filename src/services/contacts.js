import { ContactsCollection } from '../db/models/contacts.js';
import { SORT_ORDER } from '../constants/contacts-constants.js';
import { parseSortOrder } from '../utils/parseSortOrder.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

const getAll = async ({ page, perPage }) => {
  // const {sortBy = 'name', sortOrder = SORT_ORDER.ASC, type, isFavourite} = req.query;
  // //перевірити фільтрацію по isFavourite
  // return await ContactsCollection.find().where('contactType').eq(type).where('isFavourite').eq(isFavourite).sort({[sortBy]: parseSortOrder(sortOrder)});

  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();
  const contactCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await ContactsCollection.find().skip(skip).limit(perPage);
  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

const addContact = async (data) => {
  return await ContactsCollection.create(data);
};

const updateContact = async (filter, data, options = {}) => {
  const result = await ContactsCollection.findOneAndUpdate(filter, data, {
    // new: true,
    // runValidators: true,
    includeResultMetadata: true,
    ...options,
  });
  if (!result || !result.value) return null;

  return {
    data: result.value,
  };
};

const deleteContact = async (filter) => {
  return await ContactsCollection.findOneAndDelete(filter);
};

export const contactsService = {
  getAll,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
};
