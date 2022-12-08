import axios from 'axios';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const parser = new XMLParser();
const DRONE_POS_URL = "https://assignments.reaktor.com/birdnest/drones"

function apiCalls(){
  //This promise will resolve when the network call succeeds
  var networkPromise = axios.get(DRONE_POS_URL)


  //This promise will resolve when 2 seconds have passed
  var timeOutPromise = new Promise((resolve, reject) => {
    // 2 Second delay
    setTimeout(resolve, 2000, 'Timeout Done');
  });

  Promise
    .all([ networkPromise, timeOutPromise ])
    .then(values => {
      const XMLdata = values[0].data;

      let jObj = parser.parse(XMLdata);
      console.log(jObj["report"]["capture"]);
      apiCalls();
    });
}

export default apiCalls;