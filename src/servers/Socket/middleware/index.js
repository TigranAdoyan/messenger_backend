const uuid = require('uuid');
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

   async session(socket, next) {
       const sessionID = socket.handshake.auth.sessionID;

       if (sessionID) {
          // find existing session
          const session = RedisClients.messengerSession.get(sessionID);
          if (session) {
             socket.sessionID = sessionID;
             socket.userID = session.userID;
             socket.username = session.username;

             console.log('old session')
             return next();
          }
       }

       const username = socket.handshake.auth.username;

       if (!username) {
          return next(new Error('invalid username'));
       }

       console.log('new session')

       socket.sessionID = uuid.v1();
       socket.userID = uuid.v1();
       socket.username = username;
       next();
   }
}

module.exports = new Middleware();
