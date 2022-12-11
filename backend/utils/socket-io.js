import { Server } from 'socket.io';
import dronesController from '../controllers/drones.js';
import pilotServices from '../services/pilots.js';

let io;

const socketConnection = (server) => {
  io = new Server(server, {
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

    socket.on('get-pilot-info', async ({serialNumber}) => {
      socket.emit('pilot-info', { 
        pilot : JSON.stringify(await pilotServices.getPilotInfo(serialNumber))
      })
    })
  })
}

const updateData = (payload) => {
  io.emit('update', { 
    drones : JSON.stringify(payload["report"]["capture"]["drone"]),
    violate : JSON.stringify(dronesController.getAllViolatedDrone())
  });
}

export default { socketConnection, updateData };