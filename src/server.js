import express from 'express';
import cors from 'cors';

import contacts from './db/contacts.js';
// логіка роботи вашого express-серверу.
const setupServer = () => {
  const app = express();
  app.use(cors());

  app.get();

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
