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
         console.log(`Express app started on the port ${configs.EXPRESS_PORT}`);
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

   console.log(err)

   return res.status(httpCode.INTERNAL_ERROR).json({
      message: 'Server internal error',
   })
}

module.exports = ExpressApp;