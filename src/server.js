const http = require('http');
const app = require('./app');
const config = require('config');

const mongoDB_connection = require('./database/db_connect');

const PORT = config.get('PORT');

// creating the server using the app object
const server = http.createServer(app);

// connect to database and start server
function startServer() {
  mongoDB_connection();
  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
startServer();
