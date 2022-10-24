const express = require('express');
const rootRouter = require('./routes');
const {httpCode, HttpError} = require("../../cores/HttpError");

module.exports.create = function() {
   global.expressServer = express();

   expressServer.use(cors());
   expressServer.use(express.json());

   expressServer.use(rootRouter);

   expressServer.use(errorHandler);

   expressServer.listen(configs.EXPRESS_PORT, () => {
      logger.info(`Express: launched successfully PORT => "${configs.EXPRESS_PORT}"`);
   });

   global.expressServer = expressServer;
};

// Helpers
function errorHandler(err, req, res, next) {
   if (err instanceof HttpError) {
      return res.status(err.code).json({
         message: err.message
      })
   }

   logger.error(`Http Error Handler: ${err.message}`);

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
