import { contactsService, contactIdService } from '../services/contacts.js';

const getAll = async (req, res, next) => {
  try {
    const contacts = await contactsService.getAll();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const contactsController = { getAll };

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactIdService(contactId);
    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const contactsControllerId = { getById };
