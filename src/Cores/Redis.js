const redis = require('redis');

const dbs = {
   auth_users: 0,
   game_state: 1,
};

class RedisClient {
   constructor(db) {
      this.client = redis.createClient({
         url: `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`,
         password: configs.REDIS_PASSWORD,
         database: dbs[db]
      });

      this.client.connect()
          .then(() => {
             logger.info(`Redis: connected successfully "${db}"`);
          }).catch((err) => {
             logger.error(`Redis: connection error ${err}`);
          });

      this.client.on('error', (err) => {
         console.log('redis error ', err)
      })
   }
}

module.exports.auth = new RedisClient('auth_users');
module.exports.gameState = new RedisClient('game_state');
