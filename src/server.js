import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
dotenv.config();

import contacts from './db/contacts.js';

const PORT = Number(process.env.PORT);

const setupServer = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(logger);
  app.use(cors());

  app.get('/api/contacts', (req, res) => {
    res.json(contacts);
  });

  app.use((req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
