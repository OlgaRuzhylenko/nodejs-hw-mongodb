import { ContactsCollection } from '../db/models/contacts.js';

const getAll = async () => {
  return await ContactsCollection.find();
};

export const contactsService = { getAll };

const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

export const contactIdService = { getContactById };
