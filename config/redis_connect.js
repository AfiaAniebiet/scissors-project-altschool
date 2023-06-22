const Redis = require('redis');
const config = require('config');

class Cache {
  constructor() {
    this.redis = null;
  }

  async connect() {
    this.redis = await Redis.createClient({
      url: `redis://${config.get('REDIS_USERNAME')}:${config.get('REDIS_PASSWORD')}@${config.get(
        'REDIS_HOST'
      )}:${config.get('REDIS_PORT')}`,
    });

    this.redis.connect();

    this.redis.on('connect', () => {
      console.log('Redis connection is established.');
    });

    this.redis.on('error', () => {
      console.log("Oops! Couldn't connect to Redis. Try again!");
    });
  }
}

const instance = new Cache();
module.exports = instance;

// const { createClient } = require('redis');
// const redis = require('redis');

// // const client = createClient();
// const client = redis.createClient();

// const redisConnection = function () {
//   client.on('error', (err) => {
//     console.log("Oops! Couldn't connect to Redis. Try again!", err);
//   });

//   client.on('connect', () => {
//     console.log('Redis connection is established.');
//   });
// };

// module.exports = { redisConnection, client };
