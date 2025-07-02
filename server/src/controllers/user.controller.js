import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"
import {ApiResponse} from "../utils/apiResponse.js"
import {uploadFileOnCloudinary} from "../utils/cloudinary.js"
import {User} from "../models/user.model.js"
import {generateAccessAndRefreshToken} from "../utils/generateAccessAndRefreshToken.js"
import { httpOnlyCookie } from "../constants.js";



const registerUser = asyncHandler(async (req,res)=>{

    const {username,email,fullName,password,phone} = req.body

    if(!(username && email && fullName && password && phone)){
        throw new ApiError(400,"All Fields are Required")
    }

    if([username,email,fullName,password].some((f)=> f.trim() === "")){
        throw new ApiError(400,"No Fields Should be Empty")
    }

    const user = await User.findOne({
        email
    })

    if(user){
        throw new ApiError(400,"User with this Email Already Exists")
    }

    const newUser = await User.create({
        username,
        email,
        fullName,
        password,
        phone,
        avatar:"http://res.cloudinary.com/drftighpf/image/upload/v1751458090/f5ozv63h6ek3ujulc3gg.jpg"
    })

    if(!newUser){
        throw new ApiError(500,"Server Error")
    }


    return res
            .status(201)
            .json(
                new ApiResponse(200,{
                    username:newUser.username,
                    email:newUser.email,
                    fullName:newUser.fullName,
                },"User Registered Successfully")
            )

})

const loginUser = asyncHandler(async (req,res)=>{

    const {email,password} = req.body

    if(!(email && password)){
        throw new ApiError(400,"Both Fields are Required")
    }

    if(email.trim() === "" || password.trim() === ""){
        throw new ApiError(400,"Email or Password cannot be Empty")
    }

    const user = await User.findOne({
        email
    })

    if(!user){
        throw new ApiError(400,"Account doesn't Exists")
    }

    const isCorrectPassword = await user.isCorrectPassword(password)

    if(!isCorrectPassword){
        throw new ApiError(400,"Incorrect Password")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    if(!(accessToken && refreshToken)){
        throw new ApiError(500,"Server Error")
    }

    return res
            .status(200)
            .cookie("accessToken",accessToken, {...httpOnlyCookie , sameSite:"Strict"})
            .cookie("refreshToken",refreshToken, {...httpOnlyCookie , sameSite:"Strict"})
            .json(
                new ApiResponse(200,{
                    username:user.username,
                    email:user.email,
                    fullName:user.fullName
                },
            "Login Successfully"
            )
            )

})


export {
    registerUser,
    loginUser
}