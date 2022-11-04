const Redis = require('ioredis');

const dbs = {
   auth_users: 0,
   messengerSession: 1,
};

class RedisClient {
    constructor(db) {
      this.client = new Redis(`redis://127.0.0.1:6380/${dbs[db]}`);

      logger.info(`Redis: connected successfully "${db}"`);
   }

   get(field) {
       return this.client.get(field);
   }
}

module.exports.auth = new RedisClient('auth_users');
module.exports.messengerSession = new RedisClient('messengerSession');
