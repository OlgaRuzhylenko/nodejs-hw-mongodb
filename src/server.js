import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import dotenv from 'dotenv';
// dotenv.config();
import env from './utils/env.js';
import { Router } from 'express';
import { ContactsCollection } from './db/models/contacts.js';

const port = env('PORT', '3000');

const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  app.use(express.json);
  app.use(logger);
  app.use(cors());

  const contactsRouter = new Router();

  contactsRouter.get('/contacts', async (req, res, next) => {
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
  });

  app.use('*', (error, req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Not found',
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default setupServer;

