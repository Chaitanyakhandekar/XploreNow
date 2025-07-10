import mongoose, { Schema } from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const reviewSchema = new Schema({

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

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    comment: {
        type: String
    },

    isReported: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

reviewSchema.plugin(mongooseAggregatePaginate)

export const Review =  mongoose.model("Review", reviewSchema)
