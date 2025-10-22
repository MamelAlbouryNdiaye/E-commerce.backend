import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

////// setup  //////
dotenv.config();
const app = express();
const port = process.env.PORT || 3030;

////////// ESM: create __dirname ///////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// db connection
connectDB();











app.listen(port, () => console.log(`Server running on ${port}`));