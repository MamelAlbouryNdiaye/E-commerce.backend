import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectionStr = process.env.mongoURL || "";

async function connectDB (){
    try{
        await mongoose.connect(connectionStr)
        console.log(`Connected to MongoDB`)
    }catch(err){
        console.error(err.message);
    }

}

export default connectDB;