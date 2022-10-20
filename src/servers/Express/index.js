const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes');
const {httpCode, HttpError} = require("../../Cores/HttpError");

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

module.exports = ExpressApp;
