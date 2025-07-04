import mongoose from "mongoose";
import dotenv from "dotenv"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadFileOnCloudinary,deleteFileFromCloudinary } from "../utils/cloudinary.js"
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
        publicId:logo.public_id,
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

const logoutAgency = asyncHandler(async (req,res)=>{        // verifyJWTAgency middleware

    const agency = await Agency.findById(req.agency._id)

    if(!agency){
        throw new ApiError(400,"Agency not found")
    }

    agency.refreshToken = undefined
    agency.lastLoggedOutAt = Date.now()

    await agency.save({validateBeforeSave:false})

    return res
            .status(200)
            .clearCookie("accessToken" , {...httpOnlyCookie , sameSite:"Strict"})
            .clearCookie("refreshToken" , {...httpOnlyCookie , sameSite:"Strict"})
            .json(
                new ApiResponse(200,null,"Agency Logout Successfully")
            )

})

const updateProfile = asyncHandler(async (req,res)=>{       // verifyJWTAgency middleware

    const {name,description} = req.body

    if(!(name || description)){
        throw new ApiError(400,"Atleast one Field is Required for Update")
    }

    if((name && name.trim() === "") || (description && description.trim() === "")){
        throw new ApiError(400,"Any Field Cannot be Empty")
    }

    let update = {}
    if(name) update = {...update , name:name.toLowerCase()}
    if(description) update = {...update , description}


    const updatedAgency = await Agency.findByIdAndUpdate(
        req.agency._id,
        {
            $set:update
        },
        {
            new:true
        }
    ).select("-password -refreshToken")

    if(!updatedAgency){
        throw new ApiError(500,"Server Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,{
                    name:updatedAgency.name,
                    description,
                    email:updatedAgency.email,
                    phone:updatedAgency.phone,
                    logo:updatedAgency.logo,
                    isVerified:updatedAgency.isVerified
                },
                "Agency Updated Successfully")
            )

})

const updateLogo = asyncHandler(async (req,res)=>{      // verifyJWTAgency, multer middleware

    const logoLocalPath = req.file?.path

    if(!logoLocalPath){
        throw new ApiError(400,"Logo image is required for update Logo")
    }

    const agency = await Agency.findById(req.agency._id)

    if(!agency){
        throw new ApiError(400,"Agency not found")
    }

    const logo = await uploadFileOnCloudinary(logoLocalPath)

    if(!logo){
        throw new ApiError(500,"Cloudinary Upload Failed")
    }
    const oldPublicId = agency.publicId

    agency.logo = logo.secure_url
    agency.publicId = logo.public_id

    await agency.save({validateBeforeSave:false})

    deleteFileFromCloudinary(oldPublicId)

    return res
            .status(200)
            .json(
                new ApiResponse(200,{
                    logo:logo.secure_url,
                    publicId:logo.public_id
                },"Logo Updated Successfully")
            )

})

const updatePassword = asyncHandler(async (req,res)=>{      // verifyJWTAgency middleware

    const {currentPassword,newPassword} = req.body

    if(!(currentPassword && newPassword)){
        throw new ApiError(400,"Both current and new password are required fields")
    }

    if(currentPassword.trim() === "" || newPassword.trim() === ""){
        throw new ApiError(400,"No field can be Empty")
    }

    if (newPassword.length < 8) {
    throw new ApiError(400, "New password must be at least 8 characters long")
}


    const agency = await Agency.findById(req.agency._id)

    const isCorrectPassword = await agency.isCorrectPassword(currentPassword)

    if(!isCorrectPassword){
        throw new ApiError(400,"Incorrect Password")
    }

    agency.password = newPassword

    await agency.save()

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokenAgency(req.agency._id)

    if (!(accessToken && refreshToken)) {
        throw new ApiError(500, "Server Error")
    }

    return res
            .status(200)
            .cookie("accessToken",accessToken,{...httpOnlyCookie , sameSite:"Strict"})
            .cookie("refreshToken",refreshToken,{...httpOnlyCookie , sameSite:"Strict"})
            .json(
                new ApiResponse(200,null,"Password Updated Successfully")
            )
})

const refreshAccessToken = asyncHandler(async (req,res)=>{

    const encodedRefreshToken = req.cookies?.refreshToken

    if (!encodedRefreshToken || encodedRefreshToken.trim() === "") {
        throw new ApiError(400, "Refresh token missing")
    }

    let decodedRefreshToken;

    try {
         decodedRefreshToken = jwt.verify(encodedRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        throw new ApiError(401,"Invalid or expired refresh token")
    }

    if(!decodedRefreshToken){
        throw new ApiError(500,"Server error")
    }

    const agency = await Agency.findById(decodedRefreshToken._id)

    if(!agency){
        throw new ApiError(500,"Agency not found")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshTokenAgency(agency._id)

    if(!(accessToken && refreshToken)){
        throw new ApiError(500,"Server Error")
    }

    if(agency.refreshToken !== encodedRefreshToken){
        throw new ApiError(403,"Refresh token is invalid or has been rotated")
    }

    return res
            .status(200)
            .cookie("accessToken",accessToken,{...httpOnlyCookie , sameSite:"Strict"})
            .cookie("refreshToken",refreshToken,{...httpOnlyCookie , sameSite:"Strict"})
            .json(
                new ApiResponse(200,null,"AccessToken Refreshed Successfully")
            )

})

export {
    registerAgency,
    loginAgency,
    logoutAgency,
    updateProfile,
    updateLogo,
    updatePassword,
    refreshAccessToken
}