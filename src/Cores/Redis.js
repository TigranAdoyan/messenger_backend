const redis = require('redis');

const dbs = {
   auth_users: 0,
   game_state: 1,
}

class RedisClient {
   constructor(db) {
      console.log(`http://${configs.REDIS_HOST}:${configs.REDIS_PORT}`);

      this.client = redis.createClient({
         url: `redis://${configs.REDIS_HOST}:${configs.REDIS_PORT}`,
         password: configs.REDIS_PASSWORD,
         database: dbs[db]
      });

      this.client.connect()
          .then(() => {
             console.log(`redisClient successfully connected ${db}`);
          }).catch((err) => {
             console.log(`redis connection error ${err}`);
          })

      this.client.on('error', (err) => {
         console.log('redis error ', err)
      })
   }
}

module.exports = RedisClient;