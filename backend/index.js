import app from './app.js';
import http from 'http';

import { Server } from 'socket.io';

const PORT = 3001;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('new person connected.');
})


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})