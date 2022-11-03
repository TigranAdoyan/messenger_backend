require('./configuration/events');

const io = require('socket.io');
const controllers = require('./controllers');

module.exports.create = () => {
    const ioServer = new io.Server(configs.SOCKET_PORT, {
        cors: {
            origin: ['http://localhost:3000'],
        },
        // pingTimeout: 30,
        // pingInterval: 10
    });
    ioServer.namespaces = {
        message: 'message'
    };

    logger.info(`SocketIO: launched successfully PORT => "${configs.SOCKET_PORT}"`);

    ioServer.engine.on("connection_error", (err) => {
        logger.error(`Socket: connection error: ${err.message}`);
    });

    // binding controllers
    controllers.MessageController.create(ioServer);
};
