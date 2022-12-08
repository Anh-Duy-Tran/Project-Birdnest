import { Router } from 'express';
import { DRONES } from '../models/drones.js';

import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const droneRouter = Router();

droneRouter.get('/all', (req, res) => {
  return res.json(DRONES);
})

droneRouter.get('/ndz', (req, res) => {

})

droneRouter.get('/connect', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
})



export default droneRouter;