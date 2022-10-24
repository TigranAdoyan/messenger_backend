require('dotenv').config();
require('./override_prototypes');

global.httpCode = require('../cores/HttpError').httpCode;
global.HttpError = require('../cores/HttpError').HttpError;
global.logger = require('../cores/Logger');

global.configs = {
   EXPRESS_PORT: parseInt(process.env.EXPRESS_PORT),
   SOCKET_PORT: parseInt(process.env.SOCKET_PORT),
   JWT_SECRET: process.env.JWT_SECRET,
   REDIS_HOST: process.env.REDIS_HOST,
   REDIS_PORT: parseInt(process.env.REDIS_PORT),
   REDIS_PASSWORD: process.env.REDIS_PASSWORD,
   MONGO_MESSENGER_URL: process.env.MONGO_MESSENGER_URL,
   MYSQL: {
      DURAK: {
         host: process.env.MYSQL_MESSENGER_HOST,
         port: parseInt(process.env.MYSQL_MESSENGER_PORT),
         database: process.env.MYSQL_MESSENGER_DATABASE,
         user: process.env.MYSQL_MESSENGER_USER,
         password: process.env.MYSQL_MESSENGER_PASSWORD
      }
   },
};

global.MysqlMessengerClients = require('../mysql/messenger');
global.RedisClients = require('../cores/Redis');
global.MongoClients = require('../mongo/messenger');