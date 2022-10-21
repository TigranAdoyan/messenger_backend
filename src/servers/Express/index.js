const express = require('express');
const bodyParser = require('body-parser');
const rootRouter = require('./routes');
const {httpCode, HttpError} = require("../../cores/HttpError");

class ExpressApp {
   constructor() {
      this.app = express();

      this.app.use(cors());
      this.app.use(express.json());

      this.app.use(rootRouter);

      this.app.use(errorHandler);

      this.listen();
   }

   listen() {
      this.app.listen(configs.EXPRESS_PORT, () => {
         logger.info(`Express: launched successfully PORT => "${configs.EXPRESS_PORT}"`);
      })
   }
}

// Helpers
function errorHandler(err, req, res, next) {
   if (err instanceof HttpError) {
      return res.status(err.code).json({
         message: err.message
      })
   }

   logger.error(err.message);

   return res.status(httpCode.INTERNAL_ERROR).json({
      message: 'Server internal error',
   })
}

function cors() {
   return function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', '*');
      if (req.method === 'OPTIONS') {
         return res.json();
      }
      next();
   };
}

module.exports = ExpressApp;
