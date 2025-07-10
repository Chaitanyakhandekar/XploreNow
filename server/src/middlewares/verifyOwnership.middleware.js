import mongoose from "mongoose";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Trip } from "../models/trip.model.js";

export const verifyOwnership = asyncHandler(async(req,res,next)=>{  // verifyJWTAgency middleware is must
    
    const tripId = req.body?.tripId || req.query?.tripId || req.params?.tripId

    console.log(tripId)

    if(!tripId){
        throw new ApiError(400,"valid tripId is required")
    }

    const isOwner = await Trip.findOne({
        _id:tripId,
        createdBy:req.agency._id
    })

    if(!isOwner){
        throw new ApiError(401,"you are not owner of this trip")
    }

    req.agency = {...req.agency , tripId}

    next()

})