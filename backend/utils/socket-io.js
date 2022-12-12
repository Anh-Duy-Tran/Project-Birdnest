/**
 * Setup socket connection with socketio
 */

import { Server } from 'socket.io';
import dronesController from '../controllers/drones.js';

let io;

const socketConnection = (server) => {
  io = new Server(server, {
    cors : {
      origin : "http://ec2-13-48-78-125.eu-north-1.compute.amazonaws.com/",
      methods : ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('new person connected.');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  })
}

const updateData = (payload) => {
  io.emit('update', { 
    drones : JSON.stringify(payload["report"]["capture"]["drone"]),
    violate : JSON.stringify(dronesController.getAllViolatedDrone())
  });
}

export default { socketConnection, updateData };