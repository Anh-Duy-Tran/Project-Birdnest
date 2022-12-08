import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { DATA } from '../models/data.js';
import droneController from '../controllers/drones.js'

const API_INTERVAL = 2;
const TIME_INTERVAL = 10;
const MAX_STORE_DRONE = TIME_INTERVAL*60 / API_INTERVAL;

const parser = new XMLParser();
const DRONE_POS_URL = "https://assignments.reaktor.com/birdnest/drones"

function apiCalls(){
  //This promise will resolve when the network call succeeds
  var networkPromise = axios.get(DRONE_POS_URL)


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
      droneController.addData(jObj)
      if ( DATA.length > MAX_STORE_DRONE ) {
        // TODO: remove the data from DRONES also
        DATA.shift();
      }
      apiCalls();
    });
}

export default apiCalls;