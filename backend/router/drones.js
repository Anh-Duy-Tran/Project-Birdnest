/**
 * API endpoints for getting the drones data
 */

import { Router } from 'express';

import dronesController from '../controllers/drones.js'

const droneRouter = Router();

droneRouter.get('/all', (req, res) => {
  return res.json(dronesController.getAllDrone());
})

droneRouter.get('/ndz', (req, res) => {
  return res.json(dronesController.getAllViolatedDrone());
})

droneRouter.get('/:id', (req, res) => {
  const drone = dronesController.getDroneBySerialNumber(req.params.id);
  if (drone === undefined) {
    return res.status(404).json({ error : "Drone not found."}).end();
  }
  return res.json(drone);
})

export default droneRouter;