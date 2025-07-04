import mongoose from "mongoose";
import dotenv from "dotenv"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadFileOnCloudinary,deleteFileFromCloudinary } from "../utils/cloudinary.js"
import { Trip } from "../models/trip.model.js"
import { generateAccessAndRefreshTokenAgency } from "../utils/generateAccessAndRefreshTokensAgency.js"
import { httpOnlyCookie } from "../constants.js";
import jwt from "jsonwebtoken"

const createTrip = asyncHandler(async (req,res)=>{

    // verified agency 
    // get title,description,location,region,startDate,endDate,durationInDays(op) ,difficulty , type ,category , maxParticipents,price,images(min 3 , max - 5)
    // validate all necessary fields
    // first upload files on cloudinary 
    // store secure_url,public_id 
    // create trip
    // send response

    
})