import dotenv from "dotenv"
import mongoose from "mongoose"
import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async (req,res,next)=>{

    const encodedAccessToken = req.cookies?.accessToken

    if(!encodedAccessToken){
        throw new ApiError(401,"User not Authenticated")
    }

    let decodedAccessToken;

    try {
            decodedAccessToken = jwt.verify(encodedAccessToken,process.env.ACCESS_TOKEN_SECRET)
        } catch (error) {
            throw new ApiError(401,"Invalid or Expired AccessToken")
        }

    if(!decodedAccessToken || (decodedAccessToken && decodedAccessToken.role!== "user")){
        throw new ApiError(403,"Server Error")
    }

    req.user = {
        _id:decodedAccessToken._id
    }

    next()

})