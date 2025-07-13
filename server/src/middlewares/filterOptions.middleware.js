import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";

export const filterOptions = asyncHandler(async (req,res,next)=>{      // verifyJWTAgency middleware for Agency specific Trip filter

    const {
         // true or false
        type,
        search,
        startDate,
        endDate,
        difficulty,
        category,
        minPrice,
        maxPrice,
        tags
    } = req.query

    let filterQuery = {}

    const addFeilds = ()=>{
        if(type) filterQuery.type = type
        if(difficulty) filterQuery.difficulty = difficulty
        if(category) filterQuery.category = category
         if (tags) {
            filterQuery.tags = Array.isArray(tags)
                ? { $in: tags }
                : { $in: tags.split(",") };
        }
        
        if(minPrice || maxPrice ){
            filterQuery.price = {}

            if(minPrice) filterQuery.price.$gte = Number(minPrice)
            if(maxPrice) filterQuery.price.$lte = Number(maxPrice)
        }

       if (startDate) {
        const start = new Date(startDate);
        const nextDay = new Date(start);
        nextDay.setDate(start.getDate() + 1);

            filterQuery.startDate = {
                $gte: start,
                $lt: nextDay
            };
        }

        if (endDate) {
            const end = new Date(endDate);
            const nextDay = new Date(end);
            nextDay.setDate(end.getDate() + 1);

            filterQuery.endDate = {
                $gte: end,
                $lt: nextDay
            };
        }

        if(search){
            filterQuery.$or = [
                {location :{ $regex:search , $options:"i"}},
                {title:{ $regex:search , $options:"i" }},
                {region:{ $regex:search , $options:"i"}}
            ]
        }
        
    }

    if(req.agency){
        filterQuery.createdBy = new mongoose.Types.ObjectId(req.agency._id)
    }

    addFeilds()

    req.filterQuery = filterQuery
    console.log(filterQuery)
    return next()

})