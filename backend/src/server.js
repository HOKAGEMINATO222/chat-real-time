import express from 'express';
import { ENV } from './config/env.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

const app = express();
dotenv.config();


app.get('/', (req, res) => {
  res.send('Hello World! 11sw');
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
  connectDB();
}); 