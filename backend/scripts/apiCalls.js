/**
 * Script to fetch from API every 2 second then store and process the data.
 */

import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { DATA } from '../models/data.js';
import droneController from '../controllers/drones.js'
import socket from '../utils/socket-io.js'

const API_INTERVAL = 2; // in second
const TIME_INTERVAL = 10; // in minute

const MAX_STORE_DRONE = TIME_INTERVAL*60 / API_INTERVAL;

const parser = new XMLParser();
const API_URL = "https://assignments.reaktor.com/birdnest/drones"

function apiCalls(){
  var networkPromise = axios.get(API_URL)

  var timeOutPromise = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'Timeout Done');
  });

  Promise
    .all([ networkPromise, timeOutPromise ])
    .then(values => {  
      const XMLdata = values[0].data;

      let jObj = parser.parse(XMLdata);
      
      DATA.push(jObj);

      // TODO: read the timestamp from the fetched data.
      droneController.addData(jObj, (new Date()).toISOString());

      if ( DATA.length > MAX_STORE_DRONE ) {
        droneController.removeData(DATA[0]);
        DATA.shift();
      }
      
      socket.updateData(jObj);
      apiCalls();
    })
    .catch(err => {
      console.log(err);
      setTimeout(() => apiCalls(), 1000);
    });
}

export default apiCalls;