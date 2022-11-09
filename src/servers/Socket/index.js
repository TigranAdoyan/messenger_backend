require('./configuration/events');

const http = require('http');
const express = require('express');
const expressStatusMonitor = require('express-status-monitor');
const ioSocket = require('socket.io');
const redis = require('redis');
const controllers = require('./controllers');
const {createAdapter} = require('@socket.io/redis-adapter');
const socketAdminUi = require('@socket.io/admin-ui');


const statusMonitorConfigs =  {
    title: 'Express Status',
    path: '/status',
    spans: [{
        interval: 1,
        retention: 60
    }, {
        interval: 5,
        retention: 60
    }, {
        interval: 15,
        retention: 60
    }],
    chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true
    },
    healthChecks: [
        {
            protocol: 'http',
            host: 'localhost',
            path: '/admin/health/ex1',
            port: '3000'
        }
    ],
    ignoreStartsWith: '/admin'
}

module.exports.create = () => {
    // create socket with redis adapter
    const expressServer = express();
    expressServer.use(expressStatusMonitor(statusMonitorConfigs));

    const httpServer = http.createServer(expressServer);

    const ioServer = new ioSocket.Server(httpServer, {
        cors: {
            origin: ["https://admin.socket.io"],
            credentials: true
        }
    });
    ioServer.namespaces = {
        message: 'message'
    };

    const pubClient = redis.createClient({
        url: `${configs.SOCKET_ADAPTER_REDIS_HOST}:${configs.SOCKET_ADAPTER_REDIS_PORT}`,
    });
    const subClient = pubClient.duplicate();

    Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        logger.info('Socket: Redis adapter connected successfully');

        ioServer.adapter(createAdapter(pubClient, subClient));

        controllers.MessageController.create(ioServer);

        socketAdminUi.instrument(ioServer, {
            auth: false
        });

        httpServer.listen(configs.SOCKET_PORT, () => {
            logger.info(`Socket: launched successfully PORT => "${configs.SOCKET_PORT}"`);
        });
    });

    // creating socket server with redis cluster
    // const ioServer = new ioSocket.Server();
    // ioServer.namespaces = {
    //     message: 'message'
    // };
    //
    // const pubClient = new Cluster(configs.REDIS_CLUSTER);
    // const subClient = pubClient.duplicate();
    //
    // ioServer.adapter(createAdapter(pubClient, subClient));
    // ioServer.listen(configs.SOCKET_PORT);
    //
    // controllers.MessageController.create(ioServer);


    // simple socket server
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
