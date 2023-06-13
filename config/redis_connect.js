const Redis = require('redis');

class Cache {
  constructor() {
    this.redis = null;
  }

  connect() {
    this.redis = Redis.createClient();

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
