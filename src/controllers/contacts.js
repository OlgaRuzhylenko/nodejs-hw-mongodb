import { contactsService } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortOrder } from '../utils/parseSortOrder.js';
import { fieldList } from '../constants/contacts-constants.js';
import { parseContactsFilterParams } from '../utils/parseContactsFilterParams.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';
import saveFileToPublicDir from '../utils/saveFileToPublicDir.js';

import env from '../utils/env.js';
const enableCloudinary = env('ENABLE_CLOUDINARY');

const getAll = async (req, res) => {
  const { _id: userId } = req.user;

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortOrder(req.query, fieldList);
  const filter = { ...parseContactsFilterParams(req.query), userId };

  const contacts = await contactsService.getAll({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getById = async (req, res) => {
  const { _id: userId } = req.user;

  const { contactId } = req.params;
  const contact = await contactsService.getContactById({
    _id: contactId,
    userId,
  });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

const addContact = async (req, res) => {
  const { _id: userid } = req.user;

  let photo = '';
// console.log(req.file);
  if (req.file) {
    if (enableCloudinary === 'true') {
      photo = await saveFileToCloudinary(req.file, 'Contacts_photo');
    } else {
      photo = await saveFileToPublicDir(req.file, 'photos');
    }
  }

  const result = await contactsService.addContact({
    ...req.body,
    userId: userid,
    photo,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: result,
  });
};

const patchContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
// console.log(req.file);
const photo = req.file;
let photoUrl = '';

  if (photo) {
    if (enableCloudinary === 'true') {
      photoUrl = await saveFileToCloudinary(photo, 'Contacts_photo');
    } else {
      photoUrl = await saveFileToPublicDir(photo, 'photos');
    }
  }

  const data = {
    ...req.body,
    photo: photoUrl,
  };

  const contact = await contactsService.updateContact(
    { _id: contactId, userId },
    data,
  );

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await contactsService.deleteContact({
    _id: contactId,
    userId,
  });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(204).json({
    status: 204,
  });
};

export const contactsController = {
  getAll,
  getById,
  addContact,
  patchContact,
  deleteContact,
};
