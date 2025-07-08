import mongoose, { Schema } from "mongoose"

const bookingSchema = new Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    },

    agencyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency"
    },

    participants: {
        type: Number,
        default: 0
    },

    amountPaid: {
        type: Number
    },

    paymentStatus: {
        type: String,
        enum: ["success", "pending", "failed"],
        default: "pending"
    },

    paymentMode: {
        type: String,
        enum: ["razorpay", "stripe", "manual"],
        default: "manual"
    },

    status: {
        type: String,
        enum: ["booked", "cancelled", "refunded"],
        default: "booked"
    },

    cancellationReason: {
        type: String
    },

    bookingDate: {
        type: Date
    },

    tripStartDate: {
        type: Date
    }

}, { timestamps: true })

export const Booking =  mongoose.model("Booking", bookingSchema)
