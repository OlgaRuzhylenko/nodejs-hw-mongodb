import { ContactsCollection } from '../db/models/contacts.js';

const getAll = async (req, res, next) => {
  try {
    const allContacts = await ContactsCollection.find();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: allContacts,
    });
  } catch (error) {
    next(error);
  }
};

export const contactsController = { getAll };
