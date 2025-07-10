import dotenv from "dotenv"
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/apiError.js"
import jwt from "jsonwebtoken"

export const verifyJWTAgency = asyncHandler(async (req,res,next)=>{

    const encodedAccessToken = req.cookies?.accessToken

    if(!encodedAccessToken){
        throw new ApiError(401,"Unauthorized Agency")
    }

    let decodedAccessToken;

    try {
         decodedAccessToken = jwt.verify(encodedAccessToken,process.env.ACCESS_TOKEN_SECRET)
    } catch (error) {
        throw new ApiError(401,"Invalid or Expired AccessToken")
    }

    if(!decodedAccessToken || (decodedAccessToken && decodedAccessToken.role!=="agency")){
        throw new ApiError(401,"Invalid or Expired AccessToken")
    }

    req.agency = {
        _id:decodedAccessToken._id
    }

    next()

}) 