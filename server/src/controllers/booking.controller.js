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
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";


const createBooking = async (req)=>{

    let newBooking;
   try {
     // const {tripId,agencyId,amountPaid,tripStartDate} = req.trip
     const {tripId,amountPaid,paymentMode,totalBookings} = req.body
 
     if(!(tripId && amountPaid && paymentMode)){
         throw new ApiError(400,"All Fields are required")
     }
 
     if(!mongoose.Types.ObjectId.isValid(tripId)){
         throw new ApiError(400,"Invalid Trip ID")
     }
 
     if(Number(amountPaid)<0){
         throw new ApiError(400,"Invalid Amount")
     }
 
     if(!["razorpay", "stripe", "manual"].includes(paymentMode)){
         throw new ApiError(400,"Invalid Payment Mode")
     }
 
     const trip = await Trip.findById(tripId)
 
     if(!trip){
         throw new ApiError(400,"Trip not found")
     }
 
      newBooking = await Booking.create({
         userId:req.user._id,
         tripId,
         agencyId:trip.createdBy,
         amountPaid,
         paymentStatus:"success",
         paymentMode,
         bookingDate:new Date(),
         participants:totalBookings,
         tripStartDate:trip.startDate
     })
 
     if(!newBooking){
         throw new ApiError(500,"Booking Error")
     }

     const updateTripParticipents = await Trip.findByIdAndUpdate(
        tripId,
        {
            $inc:{currentParticipants:totalBookings }
        },
        {
            new:true
        }
     )

     if(!updateTripParticipents){
        throw new ApiError(500,"Error while updating currentParticipants")
     }
 
     return newBooking;

   } catch (error) {
    console.error(error)
        return {
            success: false,
            booking: newBooking
        }

   }

}

export {
    createBooking
}