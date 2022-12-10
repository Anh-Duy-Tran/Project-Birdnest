import axios from "axios";

const PILOT_URL = "https://assignments.reaktor.com/birdnest/pilots/"

const getPilotInfo = (droneId) => {
  return axios
    .get(`${PILOT_URL}${droneId}`)
    .then(res => res.data);
}

export default { getPilotInfo }