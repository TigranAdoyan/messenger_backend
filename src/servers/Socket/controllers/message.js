const socketMiddleware = require('../middleware');
const Plugins = require('../plugins');

class MessageController {
   Plugins = Plugins;

   namespace = 'message';

   events = socketServer.events.message;

   constructor() {
      socketServer
          .of(this.namespace)
          .use(socketMiddleware.auth)
          .use(socketMiddleware.session)
          .on('connection', async (socket) => {
             const ids = await socketServer.of(this.namespace).fetchSockets();

             // console.log(ids.map(({id}) => id));
             // binding event handlers
             socket.on(this.events.client["client:sync"], this.Plugins.user.syncData);

             socket.on(this.events.client["client:send_message"], this.Plugins.message.onSendMessage);

             socket.on('disconnect', () => {
                console.log(`User id: ${socket.user.id} disconnected`)
             });

             socket.emit(this.events.server["server:session"], {
                sessionID: socket.sessionID,
                userID: socket.userID,
             })
          })
   }
}

module.exports = MessageController;