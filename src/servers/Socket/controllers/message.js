const socketMiddleware = require('../middleware');
const plugins = require('../plugins');


module.exports.create = function (socketServer) {
    const namespace = 'message';

    socketServer
        .of(namespace)
        .use(socketMiddleware.auth)
        .use(socketMiddleware.session)
        .on('connection', async (socket) => {
            const ids = await socketServer.of(namespace).fetchSockets();

            console.log(`Socket "${socket.id}" connected`);
            // console.log(ids.map(({id}) => id));

            // binding event handlers
            socket.on(socketEvents.client["sync_app"], () => {
                plugins.message.syncApp(socket);
            });

            socket.on(socketEvents.client["send_message"], (data) => {
                plugins.message.onSendMessage(socket, data);
            });

            socket.on('disconnect', () => {
                console.log(`User id: ${socket.user.id} disconnected`)
            });

            socket.emit(socketEvents.server["session"], {
                sessionID: socket.sessionID,
                userID: socket.userID,
            });
        })
};