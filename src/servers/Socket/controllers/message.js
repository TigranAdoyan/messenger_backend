const socketMiddleware = require('../middleware');
const plugins = require('../plugins');


module.exports.create = function (socketServer) {
    const namespace = 'message';

    socketServer
        .of(namespace)
        .use(socketMiddleware.auth)
        .use(socketMiddleware.session)
        .on('connection', async (socket) => {
            // const ids = await socketServer.of(namespace).fetchSockets();

            console.log(`UserId: "${socket.user.id}"; SocketId "${socket.id}" connected`);
            // binding event handlers
            socket.on(socketEvents.client["sync_app"], () => {
                logger.info(`Socket "${socketEvents.client["sync_app"]} : UserId "${socket.user.id}"`);
                plugins.message.syncApp(socket);
            });

            socket.on(socketEvents.client["send_message"], (data) => {
                logger.info(`Socket "${socketEvents.client["send_message"]} : UserId "${socket.user.id}"`);
                plugins.message.sendMessage(socket, data);
            });

            socket.on('disconnect', () => {
                logger.info(`User id: ${socket.user.id} disconnected`);
            });

            socket.emit(socketEvents.server["session"], {
                sessionID: socket.sessionID,
                userID: socket.userID,
            });
        })
};