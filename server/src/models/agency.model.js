import mongoose, { Schema } from "mongoose"

const agencySchema = new Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String
    },

    phone: {
        type: String
    },

    logo: {
        type: String
    },

    description: {
        type: String
    },

    website: {
        type: String
    },

    socialLinks: [
        String
    ],

    documents: [
        String
    ],

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

    isVerified:{
        type:Boolean,
        default:false
    },

    trips: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip"
        }
    ],

    earnings: {
        type: Number,
        default: 0
    },

    rating: {
        type: Number,
        default: 0
    }

}, { timestamps: true })

export const Agency =  mongoose.model("Agency", agencySchema)
