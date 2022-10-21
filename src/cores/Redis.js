const Redis = require('ioredis');

const dbs = {
   auth_users: 0,
   game_state: 1,
   online_users: 2
};

class RedisClient {
    constructor(db) {
      this.client = new Redis(`redis://127.0.0.1:6379/${dbs[db]}`);

      logger.info(`Redis: connected successfully "${db}"`);
   }
}

module.exports.auth = new RedisClient('auth_users');
module.exports.onlineUsers = new RedisClient('online_users');
module.exports.gameState = new RedisClient('game_state');
