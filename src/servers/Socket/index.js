const io = require('socket.io');
const controllers = require('./controllers');
const { authJoinGame } = require('./middlewares');


class Socket {
   constructor() {
      this.socketServer = new io.Server(configs.SOCKET_PORT, {
         cors: {
            origin: ['http://localhost:3000'],
         }
      })

      this.socketServer.engine.on("connection_error", (err) => {
         console.log(err.req);      // the request object
         console.log(err.code);     // the error code, for example 1
         console.log(err.message);  // the error message
         console.log(err.context);  // some additional error context
      });

      this.useGameControllers();
   }

   useGameControllers() {
      const controller = new controllers.GameController();

      this.socketServer.of(`/${controller._namespace}`).use(authJoinGame).on('connection',async (socket) => {
         socket.join('game_1');

         const ids = await this.socketServer.of(`/${controller._namespace}`).in('game_1').fetchSockets();

         console.log('ids', ids.map(({id}) => id))

         for (const [event, handler] of Object.entries(controller._handlersBinding)) {
            console.log(event, handler);

            socket.on(event, controller[handler]);
         }
      })
   }
}

module.exports = Socket;