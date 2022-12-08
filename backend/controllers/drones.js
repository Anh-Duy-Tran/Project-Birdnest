import { DRONES } from "../models/drones.js";
import coordValidate from "./droneChecker.js";


const addData = (data) => {
  const timestamp = data["report"]["deviceInformation"]["deviceStarted"];
  const drones = data["report"]["capture"]["drone"];

  drones.forEach(
    drone => {
      const serialNumber = drone["serialNumber"];
      
      const coord = {
        x : drone["positionX"],
        y : drone["positionY"],
        z : drone["altitude"]
      }
      
      const { coordObj, isViolated } = coordValidate(coord, timestamp)
      
      if (serialNumber in DRONES) {
        const drone = DRONES[serialNumber];
        drone["coords"].push(coordObj);
        drone["violationCount"] += isViolated ? 1 : 0;
      } else {
        const metaData = (({positionY, positionX, altitude, ...data }) => ({ info : data}))(drone)
        metaData["coords"] = [coordObj]
        metaData["violationCount"] = isViolated ? 1 : 0;        
        DRONES[serialNumber] = metaData;
      }
    }
  )
}

export default { addData }