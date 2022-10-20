function authJoinGame(socket, next) {
   console.log(socket.handshake?.auth?.token);
   console.log('IN MIDDLEWARE');
   next()
}

module.exports = authJoinGame;
