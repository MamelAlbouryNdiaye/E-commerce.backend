import express from 'express';
import dotenv from 'dotenv';

////// setup  //////
dotenv.config();
const app = express();
const port = process.env.PORT || 3030;











app.listen(port, () => console.log(`Server running on ${port}`));