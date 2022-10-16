const dotenv = require('dotenv');
dotenv.config();

const { httpCode, HttpError } = require('../Cores/HttpError');

global.configs = {
   EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT),
   SOCKET_PORT: parseInt(process.env.SOCKET_PORT),
   REDIS_HOST: process.env.REDIS_HOST,
   REDIS_PORT: parseInt(process.env.REDIS_PORT),
   REDIS_PASSWORD: process.env.REDIS_PASSWORD,
   MYSQL: {
      DURAK: {
         host: process.env.MYSQL_DURAK_HOST,
         port: parseInt(process.env.MYSQL_DURAK_PORT),
         database: process.env.MYSQL_DURAK_DATABASE,
         user: process.env.MYSQL_DURAK_USER,
         password: process.env.MYSQL_DURAK_PASSWORD
      }
   }
}

global.httpCode = httpCode;
global.HttpError = HttpError;