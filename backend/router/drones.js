import { Router } from 'express';
import { DRONES } from '../models/drones.js';

const droneRouter = Router();

droneRouter.get('/all', (req, res) => {
  res.json( DRONES );
})

droneRouter.get('/ndz', (req, res) => {

})

export default droneRouter;