import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { DATA } from '../models/data.js';
import droneController from '../controllers/drones.js'
import socket from '../utils/socket-io.js'

const API_INTERVAL = 2;
const TIME_INTERVAL = 0.1;

const MAX_STORE_DRONE = TIME_INTERVAL*60 / API_INTERVAL;

const parser = new XMLParser();
const API_URL = "https://assignments.reaktor.com/birdnest/drones"

function apiCalls(){
  //This promise will resolve when the network call succeeds
  var networkPromise = axios.get(API_URL)


  //This promise will resolve when 2 seconds have passed
  var timeOutPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'Timeout Done');
  });

  Promise
    .all([ networkPromise, timeOutPromise ])
    .then(values => {  
      const XMLdata = values[0].data;

      let jObj = parser.parse(XMLdata);
      
      DATA.push(jObj);

      droneController.addData(jObj, (new Date()).toISOString());

      socket.updateData(jObj);

      if ( DATA.length > MAX_STORE_DRONE ) {
        droneController.removeData(DATA[0]);
        DATA.shift();
      }
      apiCalls();
    });
}

export default apiCalls;