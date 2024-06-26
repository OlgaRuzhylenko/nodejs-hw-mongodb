import { ContactsCollection } from '../db/models/contacts.js';

const getAll = async () => {
  return await ContactsCollection.find();
};

const getContactById = async (contactId) => {
  return await ContactsCollection.findById(contactId);
};

const addContact = async (data) => {
return await ContactsCollection.create(data);
}

export const contactsService = { getAll, getContactById, addContact };
