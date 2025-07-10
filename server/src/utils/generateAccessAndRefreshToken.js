import mongoose from "mongoose";
import { ApiError } from "./apiError.js";
import { ReturnDocument } from "mongodb";
import { User } from "../models/user.model.js";

export const generateAccessAndRefreshToken = async (userId)=>{
    try {
        
        if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
            throw new ApiError(400,"Invalid UserID")
        }

        const user = await User.findById(userId)

        if(!user){
            throw new ApiError(400,"User does not exist")
        }

        const accessToken =  user.generateAccessToken()
        const refreshToken =  user.generateRefreshToken()

        if(!(accessToken && refreshToken)){
            throw new ApiError(500,"Server Error")
        }

        user.refreshToken = refreshToken;

        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,error.message)
    }
}