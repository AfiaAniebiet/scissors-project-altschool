const http = require('http');
const app = require('./app');
const config = require('./config/default');

const mongoDB_connection = require('./database/db_connect');

const PORT = config.PORT;

const server = http.createServer(app);

function startServer() {
  mongoDB_connection();
  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
startServer();
