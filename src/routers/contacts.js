import { Router } from 'express';
import { contactsController, contactsControllerId } from '../controllers/contacts.js';

const contactsRouter = new Router();

contactsRouter.get('/contacts', contactsController.getAll);
contactsRouter.get('/contacts/:contactId', contactsControllerId.getById);

export default contactsRouter;
