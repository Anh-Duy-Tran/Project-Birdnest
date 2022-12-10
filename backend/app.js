import express from 'express';
import cors from 'cors';
import apiCalls from './scripts/apiCalls.js';

import droneRouter from './router/drones.js';
import pilotRouter from './router/pilots.js';

apiCalls();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/drones', droneRouter);
app.use('/api/pilot', pilotRouter);

export default app;