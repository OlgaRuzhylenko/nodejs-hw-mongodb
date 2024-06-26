import { Router } from 'express';
import { contactsController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = new Router();

contactsRouter.get('/contacts', ctrlWrapper(contactsController.getAll));
contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(contactsController.getById),
);
contactsRouter.post('/', ctrlWrapper(contactsController.addContact));

export default contactsRouter;
