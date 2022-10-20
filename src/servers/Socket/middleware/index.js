const authService = require('../../../services/auth');

class Middleware {
   constructor() {
   }

   async auth(socket, next) {
      try {
         const token = socket.handshake.auth.token;

         if (typeof token !== 'string') {
            throw new HttpError('invalid token');
         }

         socket.user = await authService.auth({
            token
         });

         next();
      } catch (err) {
         next(err)
      }
   }
}

module.exports = new Middleware();
