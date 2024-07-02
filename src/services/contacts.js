import { ContactsCollection } from '../db/models/contacts.js';
import { SORT_ORDER } from '../constants/contacts-constants.js';

const getAll = async (req) => {
  const {sortBy = 'name', sortOrder = SORT_ORDER.ASC} = req.query;
  return await ContactsCollection.find().sort({[sortBy]: sortOrder});
  };

const getContactById = async (contactId) => { return await ContactsCollection.findById(contactId);};

const addContact = async (data) => { return await ContactsCollection.create(data);};

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

const deleteContact = async (filter) => { return await ContactsCollection.findOneAndDelete(filter);};

export const contactsService = { getAll, getContactById, addContact, updateContact, deleteContact};
