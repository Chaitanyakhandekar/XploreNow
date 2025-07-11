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

const getAllAgencyBookings = asyncHandler(async (req,res)=>{        // verifyJWTAgency middleware

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 20
    const skip = (page - 1) * limit
    const {status , startDate , endDate} = req.query

    let matchQuery = { agencyId:new mongoose.Types.ObjectId(req.agency._id)}

    if(status && status.trim() !=="")matchQuery.status = status
    
    if(startDate && endDate){
        matchQuery.createdAt = {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
        }
    }

    const totalBookings = await Booking.countDocuments({
        agencyId:req.agency._id
    })

    if(totalBookings===0){
        return res
                .status(200)
                .json(
                    new ApiResponse(200,null,"There is no bookings yet.")
                )
    }

    const allBookings = await Booking.aggregate([
        {
            $match: matchQuery
        },
        {
            $sort:{createdAt:-1}
        },
        {
            $skip:skip
        },
        {
            $limit:limit
        },
        {
            $lookup:{
                from:"trips",
                localField:"tripId",
                foreignField:"_id",
                as:"trip"
            }
        },
        {
            $unwind:"$trip"
        },
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"user"
            }
        },
        {
            $unwind:"$user"
        },
        {
            $project:{
                _id:1,

                trip:{
                    _id:"$trip._id",
                    title:"$trip.title",
                    startDate:"$trip.startDate",
                    region:"$trip.region"
                },

                user:{
                    _id:"$user._id",
                    fullName:"$user.fullName",
                    email:"$user.email",
                    phone:"$user.phone"
                },

                seatsBooked:"$participants",
                status:1,
                bookedAt:"$createdAt",


            }
        }
       

    ])

    if(!allBookings){
        throw new ApiError(500,"MongoDB search error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,{
                    allBookings,
                    page,
                    limit,
                    totalBookings,
                    totalPages:Math.ceil(totalBookings / limit),
                    hasMore: page * limit < totalBookings
                })
            )

})

export {
    createBooking,
    getAllAgencyBookings
}