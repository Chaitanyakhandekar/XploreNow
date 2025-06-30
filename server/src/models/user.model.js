import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({

    username: {
        type: String,
        required: true
    },

    fullName:{
        type:String,
        required:true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required:true
    },

    avatar: {
        type: String
    },

    phone: {
        type: String
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]

}, { timestamps: true })

export const User =  mongoose.model("User", userSchema)
