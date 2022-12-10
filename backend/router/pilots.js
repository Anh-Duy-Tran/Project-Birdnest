import { Router } from 'express';
import droneController from '../controllers/drones.js';
import pilotServices from '../services/pilots.js';

const pilotRouter = Router();

pilotRouter.get('/:id', async (req, res) => {
  const serialNumber = req.params.id;

  switch (droneController.isViolated(serialNumber)) {
    case true:
      res.json(await pilotServices.getPilotInfo(serialNumber));
      break;

    case false:
      res.status(403).json({ error : "Forbidden."});
      break;
  
    default:
      res.status(400).json({ error : "Cannot find serial number."});
      break;
  }
})

export default pilotRouter;