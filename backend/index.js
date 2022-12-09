import app from './app.js';
import http from 'http';
import socket from './utils/socket-io.js';

const PORT = 3001;

const server = http.createServer(app);
socket
  .socketConnection(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})