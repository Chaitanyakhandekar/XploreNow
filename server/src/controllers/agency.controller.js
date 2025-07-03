import mongoose from "mongoose";
import dotenv from "dotenv"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js"
import { Agency } from "../models/agency.model.js"
import { generateAccessAndRefreshTokenAgency } from "../utils/generateAccessAndRefreshTokensAgency.js"
import { httpOnlyCookie } from "../constants.js";
import jwt from "jsonwebtoken"


const registerAgency = asyncHandler(async (req,res)=>{      // multer middleware

    const {name,email,password,phone,description} = req.body

    if(!(name && email && password && phone && description)){
        throw new ApiError(400,"All Fields are Required")
    }

    if([name,email,password,phone,description].some((f)=> f.trim() === "")){
        throw new ApiError(400,"Any fields cannot be Empty")
    }

    const isAgencyExists = await Agency.findOne({
        email
    })

    if(isAgencyExists){
        throw new ApiError(400,"Agency with this Email Already Exists")
    }

    const logoLocalPath = req.file?.path

    if(!logoLocalPath){
        throw new ApiError(400,"Logo is Required")
    }

    const logo = await uploadFileOnCloudinary(logoLocalPath)

    if(!logo){
        throw new ApiError(500,"Server Error")
    }

    if(password.length<8){
        throw new ApiError(400,"Password must be atleast 8 characters long")
    }

    const newAgency = await Agency.create({
        name,
        email,
        password,
        phone,
        description,
        logo:logo.secure_url,
        isVerified:false
    })

    if(!newAgency){
        throw new ApiError(500,"Server Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(201,{
                    name,
                    email,
                    description
                },
                "Agency Registered Successfully")
            )

})

export {
    registerAgency
}