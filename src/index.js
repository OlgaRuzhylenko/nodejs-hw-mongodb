import setupServer from './server.js';
import initMongoConnection from './db/initMongoConnection.js';

const boodstrap = async () => {
  await initMongoConnection();
  setupServer();
};

boodstrap();
