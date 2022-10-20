const io = require('socket.io');
const controllers = require('./controllers');
const middleware = require('./middleware');


class Socket {
    constructor() {
        this.socketServer = new io.Server(configs.SOCKET_PORT, {
            cors: {
                origin: ['http://localhost:3000'],
            }
        });

        this.socketServer.engine.on("connection_error", (err) => {
            logger.error(err.req);      // the request object
            logger.error(err.code);     // the error code, for example 1
            logger.error(err.message);  // the error message
            logger.error(err.context);  // some additional error context
        });

        this.useMessageControllers();
    }

    useMessageControllers() {
        const controller = new controllers.MessageController();

        this.socketServer
            .of(`/${controller._namespace}`)
            // .use(middleware.auth)
            .on('connection', async (socket) => {
                socket.join('game_1');

                const ids = await this.socketServer.of(`/${controller._namespace}`).in('game_1').fetchSockets();

                console.log('ids', ids.map(({ id }) => id));

                for (const [event, handler] of Object.entries(controller._handlersBinding)) {
                    // console.log(event, handler);

                    socket.on(event, controller[handler]);
                }
            })
    }
}

module.exports = Socket;
