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


const createTrip = asyncHandler(async (req,res)=>{      // verifyJWTAgency middleware

    const {
        title,
        description,
        location,
        region,
        startDate,
        endDate,
        difficulty, 
        type,
        category,
        maxParticipants,
        price,
        included,
        excluded,
        itinerary,
        tags
    } = req.body

    const stringFields = [title, description, location, region, startDate, endDate, difficulty, type, category];
    const numberFields = [maxParticipants, price];

    if(stringFields.some((f)=> !f || (f && f.trim() === "")) || numberFields.some((f)=>  f===undefined || f===null)){
        throw new ApiError(400,"all fields are required and cannnot be empty.")
    }

    if([included,excluded,itinerary].some((f)=> !f.length)){
        throw new ApiError(400,"all fields are required")
    }

    if(new Date(startDate).getTime() <= Date.now()){
        throw new ApiError(400,"start date cannot be a past date")
    }

    if(new Date(endDate).getTime() <= Date.now() || new Date(endDate).getTime() < new Date(startDate).getTime()){
        throw new ApiError(400,"end date cannot be a past date or the date before start date")
    }

    if(!["easy", "moderate", "hard"].includes(difficulty.trim())){
        throw new ApiError(400,"invalid difficulty level")
    }

    if(!["trek", "trip", "camping", "adventure","backpacking","custom"].includes(type)){
        throw new ApiError(400,"invalid type")
    }

    if(!["himalayan","sahyadri","beach","wildlife","desert","international","weekend","snow","spiritual"].includes(category)){
    throw new ApiError(400,"invalid category")
    }

    if(Number(maxParticipants) < 1){
        throw new ApiError(400,"max participents cannot be less than 1")
    }

    if(parseFloat(price) < 1){
        throw new ApiError(400,"invalid price")
    }

    if(req.files?.length < 3){
        throw new ApiError(400,"minimum 3 images are required")
    }

    if(req.files?.length > 5){
        throw new ApiError(400,"you can upload maximum 5 images.")
    }

    const durationInDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)

     let imageUrls = await Promise.all(
        req.files.map(async(file)=>{
        const result = await uploadFileOnCloudinary(file.path)

        if(result.secure_url){
            return {
                imageUrl:result.secure_url,
                publicId:result.public_id
            }
        }
    })
    )
    
    if(!imageUrls.length){
        throw new ApiError(500,"coludinary upload failed")
    }

    const newTrip = await Trip.create({
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        region: region.trim(),
        startDate:new Date(startDate),
        endDate:new Date(endDate),
        durationInDays:Number(durationInDays===0 ? 1 : Math.ceil(durationInDays)),
        difficulty: difficulty.trim(),
        type: type.trim(),
        category: category.trim(),
        maxParticipants:Number(maxParticipants),
        price:parseFloat(price),
        images:imageUrls,
        included:JSON.parse(included),
        excluded:JSON.parse(excluded),
        itinerary:JSON.parse(itinerary),
        tags:JSON.parse(tags) || [],
        createdBy:new mongoose.Types.ObjectId(req.agency._id)
    })

    if(!newTrip){
        throw new ApiError(500,"MongoDB creation Error")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(201,newTrip,"Trip created Successfully")
            )

})

const updateTrip = asyncHandler(async (req,res)=>{      // verifyJWTAgency , verifyOwnership middleware

     const {
        title,
        description,
        location,
        region,
        startDate,
        endDate,
        difficulty, 
        type,
        category,
        maxParticipants,
        price,
        included,
        excluded,
        itinerary,
        tags
    } = req.body

    const trip = await Trip.findById(req.agency.tripId)

    const allFields = {title, description, location, region, startDate, endDate, difficulty, type, category,maxParticipants,price,included,excluded,itinerary,tags};

    const allFieldsArray = [title, description, location, region, startDate, endDate, difficulty, type, category,maxParticipants,price,included,excluded,itinerary,tags];
    
    const isAnyFieldPresent = Object.values(allFields).some((f) => {
        if (f === undefined || f === null) return false;
        if (typeof f === "string") return f.trim() !== "";
        if (Array.isArray(f)) return f.length > 0;
        return true; // for numbers or other valid values
    });

    if (!isAnyFieldPresent) {
    throw new ApiError(400, "At least 1 field is required for update.");
    }

    if (startDate) {
        const start = new Date(startDate);
        if (isNaN(start.getTime())) {
            throw new ApiError(400, "Invalid start date");
        }
        if (start.getTime() <= Date.now()) {
            throw new ApiError(400, "Start date cannot be a past date");
        }
    }

    if (endDate) {
        const end = new Date(endDate);
        if (isNaN(end.getTime())) {
            throw new ApiError(400, "Invalid end date");
        }

        const referenceStart = startDate ? new Date(startDate) : new Date(trip.startDate);
        if (isNaN(referenceStart.getTime())) {
            throw new ApiError(500, "Trip start date is invalid");
        }

        if (end.getTime() <= Date.now() || end.getTime() < referenceStart.getTime()) {
            throw new ApiError(400, "End date cannot be in the past or before start date");
        }
    }

    if(maxParticipants && maxParticipants<1 && maxParticipants < trip.currentParticipants){
        throw new ApiError(400,"max participents cannot be less that current participents and less than 1.")
    }

    if(price && parseFloat(price)<0){
        throw new ApiError(400,"price cannot be less than 0.")
    }

    if(difficulty && !["easy", "moderate", "hard"].includes(difficulty.trim())){
        throw new ApiError(400,"invalid difficulty level")
    }

    if(type && !["trek", "trip", "camping", "adventure","backpacking","custom"].includes(type)){
        throw new ApiError(400,"invalid type")
    }

    if(category && !["himalayan","sahyadri","beach","wildlife","desert","international","weekend","snow","spiritual"].includes(category)){
    throw new ApiError(400,"invalid category")
    }

    const keys = Object.keys(allFields)

    let updateFields = {}

    allFieldsArray.forEach((field,index)=>{
        
        if(field){
            if(typeof(field)==="string" && field.trim()!== ""){
                 updateFields = {...updateFields , [keys[index]]:field}
            }
            else if(typeof(field)==="number"){
                 updateFields = {...updateFields , [keys[index]]:field}
            }
            else if(Array.isArray(field) && field.length){
                 updateFields = {...updateFields , [keys[index]]:field}
            }
        }
    })

    const updatedTrip = await Trip.findByIdAndUpdate(
        req.agency.tripId,
        updateFields,
        {
            new:true
        }
    )

    if(!updatedTrip){
        throw new ApiError(500,"MongoDB updation Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,updatedTrip,"Trip Updated Successfully")
            )

})

const deleteTrip = asyncHandler(async (req,res)=>{      // verifyJWTAgency , verifyOwnership middleware

    const trip = await Trip.findById(req.agency.tripId)

    const images = trip.images

    const isDeleted = await Promise.all(
        images.map(async (image)=>{
            await deleteFileFromCloudinary(image.publicId)
        })
    )

    console.log(isDeleted)

    const deletedTrip = await Trip.findByIdAndDelete(req.agency.tripId)

    if(!deletedTrip){
        throw new ApiError(500,"MongoDB deletion Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,deletedTrip,"Trip Deleted Successfully")
            )

})

const getTripById = asyncHandler(async (req, res) => { // verifyJWTAgency, verifyOwnership middleware

    const trip = await Trip.findById(req.agency.tripId);

    if (!trip) {
        throw new ApiError(404, "Trip not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, trip, "Trip fetched successfully")
        );
});

const getAllAgencyTrips = asyncHandler(async (req,res)=>{   // verifyJWTAgency, filterOptions middleware

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    const filterQuery = req.filterQuery
   

    const totalTrips = await Trip.countDocuments(filterQuery)

    console.log(totalTrips)

    if(totalTrips===0){
        return res
                .status(200)
                .json(
                    new ApiResponse(200,null,"you haven't created trips yet")
                )
    }

    const allTrips = await Trip.aggregate([
        {
            $match:filterQuery
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
            $project:{
                __v:0
            }
        }
    ])

    if(!allTrips.length){
        throw new ApiError(500,"Server Error")
    }

    console.log(allTrips)

    return res
            .status(200)
            .json(
                new ApiResponse(200,{
                    allTrips,
                    page,
                    limit,
                    totalTrips,
                    totalPages:Math.ceil(totalTrips / limit),
                    hasMore: page * limit < totalTrips

                },"Agency Trips Fetched Successfully")
            )

})

const getAllPublicTrips = asyncHandler(async (req,res)=>{   // filterOptions middleware

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    const filterQuery = req.filterQuery
   

    const totalTrips = await Trip.countDocuments(filterQuery)

    console.log(totalTrips)

    if(totalTrips===0){
        return res
                .status(200)
                .json(
                    new ApiResponse(200,null,"No trips are available")
                )
    }

    const allTrips = await Trip.aggregate([
        {
            $match:filterQuery
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
            $project:{
                __v:0
            }
        }
    ])

    if(!allTrips.length){
        throw new ApiError(500,"Server Error")
    }

    console.log(allTrips)

    return res
            .status(200)
            .json(
                new ApiResponse(200,{
                    allTrips,
                    page,
                    limit,
                    totalTrips,
                    totalPages:Math.ceil(totalTrips / limit),
                    hasMore: page * limit < totalTrips

                },"All Public Trips Fetched Successfully")
            )

})

const getAllTripParticipants = asyncHandler(async (req,res)=>{  // verifyJWTAgency , verifyOwnership middleware

    const totalParticipants = await Booking.countDocuments({
        agencyId:new mongoose.Types.ObjectId(req.agency._id),
        tripId: new mongoose.Types.ObjectId(req.agency.tripId)
    })

    if(totalParticipants===0){
        return res
                .status(200)
                .json(
                    new ApiResponse(200,[],"No participants in trip yet")
                )
    }

    const tripParticipants = await Booking.aggregate([
        {
            $match:{
                agencyId:new mongoose.Types.ObjectId(req.agency._id),
                tripId: new mongoose.Types.ObjectId(req.agency.tripId)
            }
        },
        {
            $sort:{createdAt:-1}
        },
        {
            $lookup:{
                from:"users",
                localField:"userId",
                foreignField:"_id",
                as:"user",
                pipeline:[
                    {
                        $project:{
                            _id:1,
                            fullName:1,
                            email:1,
                            phone:1
                        }
                    }
                ]
            }
        },
        {
            $unwind:"$user"
        },
        {
            $project:{

                    _id:0,
                    bookingId:"$_id",
                    bookingDate:"$createdAt",
                    seatsBooked:"$participants",
                    userId: "$user._id",
                    fullName: "$user.fullName",
                    email: "$user.email",
                    phone: "$user.phone",
                    paymentStatus: "$paymentStatus"
            
            }
        }
    ])

    if(!tripParticipants.length){
        throw new ApiError(500,"Server Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,tripParticipants,"All Trip Participants Fetched Successfully.")
            )

})

const getTripByIdForUser = asyncHandler(async (req, res) => { // verifyJWT, middleware

    const trip = await Trip.findById(req.params.tripId);

    if (!trip) {
        throw new ApiError(404, "Trip not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, trip, "Trip fetched successfully")
        );
});

const getUserTrips = asyncHandler(async (req,res)=>{        // verifyJWT , filterOptions middleware

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const totalTrips = await Booking.countDocuments(req.filterQuery)

    if(totalTrips===0){
        return res
                .status(200)
                .json(
                    new ApiResponse(200,[],"You Haven't Booked Trips Yet.")
                )
    }

    let userTrips = await Booking.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(req.user._id)
            }
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
                as:"trip",          // only one trip for one each document
                
            }
        },
        {
            $unwind:"$trip"
        },
        {
            $replaceRoot:{
                newRoot:"$trip"
            }
        }

    ])

    if(!userTrips.length){
        throw new ApiError(500,"Database Search Error")
    }

    let set = new Set()

    const finalTrips = userTrips.filter((trip)=>{
        
        if(set.has(trip._id.toString())) return false;
        set.add(trip._id.toString())
        return true
        
})

    return res
            .status(200)
            .json(
                new ApiResponse(200,{
                    userTrips:finalTrips,
                    page,
                    limit,
                    totalTrips,
                    totalPages:Math.ceil(totalTrips / limit),
                    hasMore: page * limit < totalTrips
                },
                "User Trips Fetched Successfully.")
            )

})


export {
    createTrip,
    updateTrip,
    deleteTrip,
    getTripById,
    getAllAgencyTrips,
    getAllPublicTrips,
    getAllTripParticipants,
    getTripByIdForUser,
    getUserTrips,
}