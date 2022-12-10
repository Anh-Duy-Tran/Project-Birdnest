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
      
      const { coordObj, isViolated, distanceToOrigin } = coordValidate(coord, timestamp)
      
      if (serialNumber in DRONES) {
        const drone = DRONES[serialNumber];
        drone["coords"].push(coordObj);
        drone["violationCount"] += isViolated ? 1 : 0;
        drone["closestDistance"] = Math.min(distanceToOrigin, drone["closestDistance"]);    
      } else {
        const metaData = (({positionY, positionX, altitude, ...data }) => ({ info : data}))(drone)
        metaData["coords"] = [coordObj]
        metaData["violationCount"] = isViolated ? 1 : 0;
        metaData["closestDistance"] = distanceToOrigin;        
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
  return Object
  .keys(DRONES).filter(
    key => {
      return DRONES[key]["violationCount"] > 0;
    })
  .map(
    key => {
      return {serialNumber : key, closestDistance : DRONES[key]["closestDistance"], history : getAllViolatedInstances(key) }
    }
  )
}

const getAllViolatedInstances = (droneId) => {
  return DRONES[droneId].coords.filter(
    coord => coord.violated
  )
}

const removeData = (data) => {
  const drones = data["report"]["capture"]["drone"];
  
  drones.forEach(
    drone => {
      const serialNumber = drone["serialNumber"];
      
      const removedCoord = DRONES[serialNumber]["coords"].shift();
      DRONES[serialNumber]["violationCount"] -= removedCoord["violated"] ? 1 : 0;

      if (DRONES[serialNumber]["coords"].length === 0) {
        delete DRONES[serialNumber]
      }
    }
  )
}

export default { addData, getAllDrone, getAllViolatedDrone, getDroneBySerialNumber, removeData }