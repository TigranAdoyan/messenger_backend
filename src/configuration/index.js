require('dotenv').config();

global.httpCode = require('../Cores/HttpError').httpCode;
global.HttpError = require('../Cores/HttpError').HttpError;
global.logger = require('../Cores/Logger');

global.configs = {
   EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT),
   SOCKET_PORT: parseInt(process.env.SOCKET_PORT),
   JWT_SECRET: process.env.JWT_SECRET,
   REDIS_HOST: process.env.REDIS_HOST,
   REDIS_PORT: parseInt(process.env.REDIS_PORT),
   REDIS_PASSWORD: process.env.REDIS_PASSWORD,
   MONGO_GAME_URL: process.env.MONGO_GAME_URL,
   MYSQL: {
      DURAK: {
         host: process.env.MYSQL_DURAK_HOST,
         port: parseInt(process.env.MYSQL_DURAK_PORT),
         database: process.env.MYSQL_DURAK_DATABASE,
         user: process.env.MYSQL_DURAK_USER,
         password: process.env.MYSQL_DURAK_PASSWORD
      }
   },
};
