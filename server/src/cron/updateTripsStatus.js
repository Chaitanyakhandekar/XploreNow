import cron from "node-cron"
import { Trip } from "../models/trip.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const updateTripsStatus = asyncHandler(async()=>{

    const now = new Date()

    
    await Trip.updateMany(
        {
            startDate:{$lte:now},
            endDate:{$gte:now},
            status:{$ne:"active"}
        },
        {
            $set:{
                status:"active"
            }
        }
    )

    await Trip.updateMany(
        {
            endDate:{$lt:now},
            status:{$ne:"completed"}
        },
        {
            $set:{
                status:"completed"
            }
        }
    )

    await Trip.updateMany(
        {
            startDate:{$gt:now},
            status:{$ne:"upcoming"}
        },
        {
            $set:{
                status:"upcoming"
            }
        }
    )

})