import mongoose from "mongoose";
import { dbName } from "../constants.js";
import dotenv from 'dotenv'
dotenv.config({path:".env"})

export const connectDB = async()=>{
    try {
        const connectionInfo = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("Connected to XploreNow Database on host://",connectionInfo.connection.host)
    } catch (error) {
        console.log(error)
    }
}