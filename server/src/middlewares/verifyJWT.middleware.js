import dotenv from "dotenv"
import mongoose from "mongoose"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req,res,next)=>{

    const accessToken = req.cookies?.accessToken

    if(!accessToken){
        throw new ApiError(400,"User not Authenticated")
    }

    const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)

    if(!decodedToken){
        throw new ApiError(500,"Server Error")
    }

    req.user = {
        _id:decodedToken._id
    }

    next()

})