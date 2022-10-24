require('./configuration');
const ExpressServer = require('./servers/Express');
const socketServer = require('./servers/Socket');

new ExpressServer();
socketServer.create();
