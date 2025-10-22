import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.mjs';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import passportConfig from './config/passport.mjs';
import passport from 'passport';
import log from './middlewares/loginMiddleware.mjs';
import globalErr from './middlewares/globalErr.mjs';

////// setup  //////
dotenv.config();
const app = express();
const port = process.env.PORT || 3030;

////////// ESM: create __dirname ///////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// db connection
connectDB();

/////////// Middlewares //////////
app.use(helmet());
app.use(express.json());

/////////// CORS: allow only dev frontend /////////////////
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3020',
  credentials: true
}));

////////// init passport  //////////
app.use(passport.initialize());
passportConfig(passport); 

///////////  logger middleware ////////////
app.use(log);


//////////// Rate limiter ////////////////
app.use('/api/', rateLimit({ windowMs: 1 * 60 * 1000, max: 100 }));

// error Handling middleware
app.use(globalErr);








app.listen(port, () => console.log(`Server running on ${port}`));