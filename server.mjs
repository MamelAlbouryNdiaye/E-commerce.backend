import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';

////// setup  //////
dotenv.config();
const app = express();
const port = process.env.PORT || 3030;


// db connection
connectDB();











app.listen(port, () => console.log(`Server running on ${port}`));