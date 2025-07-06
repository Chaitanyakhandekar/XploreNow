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
import { Agency } from "../models/agency.model.js";

const createTrip = asyncHandler(async (req,res)=>{      // verifyJWTAgency middleware

    // verified agency 
    // get title,description,location,region,startDate,endDate,durationInDays ,difficulty , type ,category , maxParticipents,price,images(min 3 , max - 5)
    // validate all necessary fields
    // first upload files on cloudinary 
    // store secure_url,public_id 
    // create trip
    // send response

    const {
        title,
        description,
        location,
        region,
        startDate,
        endDate,
        // durationInDays,
        difficulty, 
        type,
        category,
        maxParticipents,
        price,
        included,
        excluded,
        itinerary,
        tags
    } = req.body

    const stringFields = [title, description, location, region, startDate, endDate, difficulty, type, category];
    const numberFields = [maxParticipents, price];

    if(stringFields.some((f)=> !f || (f && f.trim() === "")) || numberFields.some((f)=>  f===undefined || f===null)){
        throw new ApiError(400,"all fields are required and cannnot be empty.")
    }

    if([included,excluded,itinerary].some((f)=> !f.length)){
        throw new ApiError(400,"all fields are required")
    }

    if(new Date(startDate).getTime() <= Date.now()){
        throw new ApiError(400,"start date cannot be a past date")
    }

    if(new Date(endDate).getTime() <= Date.now() || new Date(endDate).getTime() < new Date(startDate).getTime()){
        throw new ApiError(400,"end date cannot be a past date or the date before start date")
    }

    if(!["easy", "moderate", "hard"].includes(difficulty.trim())){
        throw new ApiError(400,"invalid difficulty level")
    }

    if(!["trek", "trip", "camping", "adventure","backpacking","custom"].includes(type)){
        throw new ApiError(400,"invalid type")
    }

    if(!["himalayan","sahyadri","beach","wildlife","desert","international","weekend","snow","spiritual"].includes(category)){
    throw new ApiError(400,"invalid category")
    }

    if(Number(maxParticipents) < 1){
        throw new ApiError(400,"max participents cannot be less than 1")
    }

    if(parseFloat(price) < 1){
        throw new ApiError(400,"invalid price")
    }

    // if(Number(durationInDays) < 1){
    //     throw new ApiError(400,"duration cannot be less than 1 day")
    // }

    if(req.files?.length < 3){
        throw new ApiError(400,"minimum 3 images are required")
    }

    if(req.files?.length > 5){
        throw new ApiError(400,"you can upload maximum 5 images.")
    }

    const durationInDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)

     let imageUrls = await Promise.all(
        req.files.map(async(file)=>{
        const result = await uploadFileOnCloudinary(file.path)

        if(result.secure_url){
            return {
                imageUrl:result.secure_url,
                publicId:result.public_id
            }
        }
    })
    )

    console.log("Image Urls = ",imageUrls)
    
    if(!imageUrls.length){
        throw new ApiError(500,"coludinary upload failed")
    }

    const newTrip = await Trip.create({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        region: region.trim(),
        startDate:new Date(startDate),
        endDate:new Date(endDate),
        durationInDays:Number(durationInDays===0 ? 1 : Math.ceil(durationInDays)),
        difficulty: difficulty.trim(),
        type: type.trim(),
        category: category.trim(),
        maxParticipents:Number(maxParticipents),
        price:parseFloat(price),
        images:imageUrls,
        included:JSON.parse(included),
        excluded:JSON.parse(excluded),
        itinerary:JSON.parse(itinerary),
        tags:JSON.parse(tags) || [],
        createdBy:new mongoose.Types.ObjectId(req.agency._id)
    })

    if(!newTrip){
        throw new ApiError(500,"MongoDB creation Error")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(201,newTrip,"Trip created Successfully")
            )

})

export {
    createTrip
}