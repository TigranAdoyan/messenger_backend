require('./configuration/events');

const ioSocket = require('socket.io');
const controllers = require('./controllers');
const { Cluster } = require('ioredis');
const {createAdapter} = require('@socket.io/redis-adapter');


module.exports.create = async () => {
    const ioServer = new ioSocket.Server();
    ioServer.namespaces = {
        message: 'message'
    };

    const pubClient = new Cluster(configs.REDIS_CLUSTER);

    // await pubClient.set('username', 'tigran');
    // const username = await pubClient.get('username');

    // console.log(username);

    const subClient = pubClient.duplicate();

    ioServer.adapter(createAdapter(pubClient, subClient));
    ioServer.listen(configs.SOCKET_PORT);

    controllers.MessageController.create(ioServer);

    // const ioServer = new io.Server(configs.SOCKET_PORT, {
    //     cors: {
    //         origin: ['http://localhost:3000'],
    //     },
    //     // pingTimeout: 30,
    //     // pingInterval: 10
    // });
    // ioServer.namespaces = {
    //     message: 'message'
    // };
    //
    // logger.info(`SocketIO: launched successfully PORT => "${configs.SOCKET_PORT}"`);
    //
    // ioServer.engine.on("connection_error", (err) => {
    //     logger.error(`Socket: connection error: ${err.message}`);
    // });
    //
    // // binding controllers
    // controllers.MessageController.create(ioServer);
};
