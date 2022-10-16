require('./configuration');
const ExpressServer = require('./servers/Express');
const SocketServer = require('./servers/Socket');

new ExpressServer();
new SocketServer();