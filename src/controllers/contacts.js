import { contactsService } from '../services/contacts.js';
import createHttpError from 'http-errors';

const getAll = async (req, res) => {
  const contacts = await contactsService.getAll();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getById = async (req, res, next) => {
  ///після допомоги ментора із next(error) прибрати try catch!!!
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);

    if (!contact) {
      return next(createHttpError(404, {
        status: 404,
        message: 'Contact not found',
        data: { message: 'Contact not found' }
      }));
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });

  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      return next(createHttpError(404, {
        status: 404,
        message: 'Invalid contact ID',
        data: { message: 'Invalid contact ID' }
      }));
    }
    next(error);
  }
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

export const contactsController = { getAll, getById, addContact };
