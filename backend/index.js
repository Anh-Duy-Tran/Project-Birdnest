import app from './app.js';
import http from 'http';

import { Server } from 'socket.io';

const PORT = 3001;

const server = http.createServer(app);
const io = new Server(server, {
  cors : {
    origin : "http://localhost:3000",
    methods : ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('new person connected.');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('ping', () => {
    console.log("ping");
    socket.emit('pong');
  });
})


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})