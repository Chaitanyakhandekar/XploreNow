import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const notificationSchema = new Schema({

    recipient: {
        type: mongoose.Schema.Types.ObjectId
    },

    recipientType: {
        type: String,
        enum: ["user", "agency", "admin"]
    },

    title: {
        type: String,
        required:true
    },

    message: {
        type: String
    },

    type: {
        type: String,
        enum: ["booking", "review", "system", "payment"]
    },

    isRead: {
        type: Boolean,
        default: false
    },

    relatedRef: {
        type: mongoose.Schema.Types.ObjectId
    }

}, { timestamps: true })


notificationSchema.plugin(mongooseAggregatePaginate)

export const Notification =  mongoose.model("Notification", notificationSchema)
