import { DRONES } from "../models/drones.js";
import coordValidate from "./droneChecker.js";


const addData = (data, timestamp) => {
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

const getAllDrone = () => {
  return {...DRONES};
}

const getDroneBySerialNumber = (id) => {
  return id in DRONES ? DRONES[id] : undefined;
}

const getAllViolatedDrone = () => {
  return Object.keys(DRONES).find(
    key => {
      const drone = DRONES[key];
      return drone["violationCount"] > 0;
    }
  )
}

export default { addData, getAllDrone, getAllViolatedDrone, getDroneBySerialNumber }