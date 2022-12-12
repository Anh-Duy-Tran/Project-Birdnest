/**
 * Drone controller contains all the business logic for the recorded drones data.
 */

import { DRONES } from "../models/drones.js";
import coordValidate from "./droneChecker.js";
import pilotServices from "../services/pilots.js"


const addData = (data, timestamp) => {
  const drones = data["report"]["capture"]["drone"];

  drones.forEach(
    async drone => {
      const serialNumber = drone["serialNumber"];
      
      const coord = {
        x : drone["positionX"],
        y : drone["positionY"],
        z : drone["altitude"]
      }
      
      const { coordObj, isViolated, distanceToOrigin } = coordValidate(coord, timestamp)
      
      if (serialNumber in DRONES) {
        const drone = DRONES[serialNumber];
        
        // fetch data of pilot only if violated.
        if (isViolated && !("pilot" in drone)) {
          drone["pilot"] = await pilotServices.getPilotInfo(serialNumber);
        }
        
        drone["coords"].push(coordObj);
        drone["violationCount"] += isViolated ? 1 : 0;
        drone["closestDistance"] = Math.min(distanceToOrigin, drone["closestDistance"]);    
      } else {
        const metaData = (({positionY, positionX, altitude, ...data }) => ({ info : data}))(drone)
        metaData["coords"] = [coordObj]
        metaData["violationCount"] = isViolated ? 1 : 0;
        
        // fetch data of pilot only if violated.
        if (isViolated) {
          metaData["pilot"] = await pilotServices.getPilotInfo(serialNumber);
        }

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
    .keys(DRONES)
    .filter(
      key => {
        return DRONES[key]["violationCount"] > 0;
      })
    .map(
      key => {
        const {coords, ...info} = DRONES[key];
        return {...info, history : getAllViolatedInstances(key) }
      }
    )
}

const getAllViolatedInstances = (droneId) => {
  return DRONES[droneId].coords.filter(
    coord => coord.violated
  )
}

const updateClosestDistance = (droneId) => {
  DRONES[droneId].closestDistance = DRONES[droneId].coords.reduce( (a, c) => Math.min(a, c.distance), 500000 );
}

const removeData = (data) => {
  const drones = data["report"]["capture"]["drone"];
  
  drones.forEach(
    drone => {
      const serialNumber = drone["serialNumber"];
      
      const removedCoord = DRONES[serialNumber]["coords"].shift();

      DRONES[serialNumber]["violationCount"] -= removedCoord["violated"] ? 1 : 0;

      if (DRONES[serialNumber]["violationCount"] === 0) {
        delete DRONES[serialNumber]["pilot"];
      }
      
      updateClosestDistance(serialNumber);

      if (DRONES[serialNumber]["coords"].length === 0) {
        delete DRONES[serialNumber]
      }
    }
  )
}

const isViolated = (droneId) => {
  return droneId in DRONES ? DRONES[droneId].violationCount > 0 : undefined;
}

export default { addData, getAllDrone, getAllViolatedDrone, getDroneBySerialNumber, removeData, isViolated }