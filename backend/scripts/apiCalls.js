import fetch from 'node-fetch';
import axios from 'axios';

const DRONE_POS_URL = "https://assignments.reaktor.com/birdnest/drones"

function apiCalls(){
  //This promise will resolve when the network call succeeds
  var networkPromise = fetch(DRONE_POS_URL);


  //This promise will resolve when 2 seconds have passed
  var timeOutPromise = new Promise((resolve, reject) => {
    // 2 Second delay
    setTimeout(resolve, 2000, 'Timeout Done');
  });

  Promise
    .all([ networkPromise, timeOutPromise ])
    .then(values => {
      console.log(values);
      apiCalls();
    });
}

export default apiCalls;