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
        name:name.toLowerCase(),
        email:email.toLowerCase(),
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
                    _id:newAgency._id,
                    name:newAgency.name,
                    email:newAgency.email,
                    description
                },
                "Agency Registered Successfully")
            )

})

const loginAgency = asyncHandler(async (req,res)=>{

     const { email, password } = req.body
    
        if (!(email && password)) {
            throw new ApiError(400, "Both Fields are Required")
        }
    
        if (email.trim() === "" || password.trim() === "") {
            throw new ApiError(400, "Email or Password cannot be Empty")
        }
    
        const agency = await Agency.findOne({
            email
        })
    
        if (!agency) {
            throw new ApiError(400, "Account doesn't Exists")
        }
    
        const isCorrectPassword = await agency.isCorrectPassword(password)
    
        if (!isCorrectPassword) {
            throw new ApiError(400, "Incorrect Password")
        }
    
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokenAgency(agency._id)
    
        if (!(accessToken && refreshToken)) {
            throw new ApiError(500, "Server Error")
        }
    
        return res
            .status(200)
            .cookie("accessToken", accessToken, { ...httpOnlyCookie, sameSite: "Strict" })
            .cookie("refreshToken", refreshToken, { ...httpOnlyCookie, sameSite: "Strict" })
            .json(
                new ApiResponse(200, {
                    _id:agency._id,
                    name: agency.name,
                    email: agency.email,
                    description: agency.description,
                    logo:agency.logo
                },
                    "Login Successfully"
                )
            )
    

})

export {
    registerAgency,
    loginAgency
}