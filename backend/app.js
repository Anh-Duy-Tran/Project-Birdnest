import express from 'express';
import cors from 'cors';
import apiCalls from './scripts/apiCalls.js';

import droneRouter from './controllers/drones.js';

apiCalls();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/drones', droneRouter);

export default app;