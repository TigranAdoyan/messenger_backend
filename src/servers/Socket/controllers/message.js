const socketMiddleware = require('../middleware');
const MessageService = require('../services/message');

class MessageController {
    service = MessageService;

    namespace = 'message';

    events = {
        send: 'send',
        sync: 'sync'
    };

    constructor(socketServer) {
        this.socketServer = socketServer;

        this.socketServer
            .of(this.namespace)
            .use(socketMiddleware.auth)
            .once('connection', async (socket) => {
                await this.service.setUserOnline(socket.user.id, socket.id);

                const ids = await this.socketServer.of(this.namespace).fetchSockets();

                console.log(ids.map(({ id }) => id));

                this.service.syncMessagingData(socket.user.id)
                    .then(data => {
                        console.log('data', data);
                        socket.emit(this.events.sync, data);
                    });

                // binding event handlers
                socket.on(this.events.send, this.onSend);

                socket.on('disconnect', () => {
                    this.service.setUserOffline(socket.user.id)
                });
            })
    }

    onSend(data) {
        console.log('on send', data);
    }

    emitSync(userId) {

    }
}

module.exports = MessageController;

// const events = {
//    send_message: 'send_message'
// };
//
// class Message {
//    _namespace = 'message';
//
//    _handlersBinding = {
//       [events.send_message]: this.onSend.name,
//    };
//
//    constructor() {}
//
//    onSend(payload) {
//       console.log(payload);
//    }
// }
//
// module.exports = Message;
