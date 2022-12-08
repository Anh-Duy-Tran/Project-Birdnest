import express from 'express';
import cors from 'cors';


import apiCalls from './scripts/apiCalls.js';

apiCalls();

const app = express();

app.use(cors());
app.use(express.json());

export default app;