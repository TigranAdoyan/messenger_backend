const io = require('socket.io');
const controllers = require('./controllers');

module.exports.create = () => {
    global.socketServer = new io.Server(configs.SOCKET_PORT, {
        cors: {
            origin: ['http://localhost:3000'],
        },
        // pingTimeout: 30,
        // pingInterval: 10
    });

    socketServer.events = {
        message: {
            client: {
                'client:sync': 'client:sync',
                'client:send_message': 'client:send_message',
            },
            server: {
                'server:sync': 'server:sync',
                'server:session': 'server:session',
            },
        }
    };

    logger.info(`SocketIO: launched successfully PORT => "${configs.SOCKET_PORT}"`);

    socketServer.engine.on("connection_error", (err) => {
        logger.error(err.message);
    });

    // binding controllers
    new controllers.MessageController();
};
