const Redis = require('ioredis');

const dbs = {
   auth_users: 0,
   messengerSession: 1,
};

class RedisClient {
    constructor(db) {

       console.log(`${configs.REDIS_HOST}:${configs.REDIS_PORT}/${dbs[db]}`);
       this.client = new Redis(`${configs.REDIS_HOST}:${configs.REDIS_PORT}/${dbs[db]}`);

      logger.info(`Redis: connected successfully "${db}"`);
   }

   get(field) {
       return this.client.get(field);
   }
}

module.exports.auth = new RedisClient('auth_users');
module.exports.messengerSession = new RedisClient('messengerSession');
