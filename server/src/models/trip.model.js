import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const tripSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required:true
    },

    location: [
        String   
    ],

    region: {
        type: String
    },

    startDate: {
        type: Date
    },

    endDate: {
        type: Date
    },

    durationInDays: {
        type: Number
    },

    difficulty: {
        type: String,
        enum: ["easy", "moderate", "hard"]
    },

    type: {
        type: String,
        enum: [
            "trek", 
            "trip", 
            "camping", 
            "adventure",
            "backpacking",
            "custom"
        ],
        required: true
    },

    category: {
        type: [String],
        enum: [
            "himalayan",
            "sahyadri",
            "beach",
            "wildlife",
            "desert",
            "international",
            "weekend",
            "snow",
            "spiritual"
        ],
        default:[]
    },

    maxParticipants: {
        type: Number
    },

    currentParticipants: {
        type: Number,
        default: 0
    },

    price: {
        type: Number
    },

    images: [
       {
        imageUrl:String,
        publicId:String
       }
    ],

    included: [
        String
    ],

    excluded: [
        String
    ],

    itinerary: [
        {
            day:Number,
            time:String,
            description:String
        }
    ],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency"
    },

    tags: [
        String
    ],

    status: {
        type: String,
        enum: ["upcoming", "active", "completed", "cancelled"],
        default: "upcoming",
        lowercase: true,
        trim: true
    },

    averageRating: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

tripSchema.plugin(mongooseAggregatePaginate)

export const Trip =  mongoose.model("Trip", tripSchema)
