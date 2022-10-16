function authJoinGame(socket, next) {
   console.log('IN MIDDLEWARE');
   next()
}

module.exports = authJoinGame;