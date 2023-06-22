const http = require('http');
const app = require('./app');
const config = require('config');
const Cache = require('../config/redis_connect');
// const { redisConnection } = require('../config/redis_connect');

const mongoDB_connection = require('./database/db_connect');

const PORT = config.get('PORT');

// creating the server using the app object
const server = http.createServer(app);

// connect to database and start server
async function startServer() {
  // connection to mongodb database
  await mongoDB_connection();

  // connection to redis
  Cache.connect();
  // redisConnection();
  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
startServer();
