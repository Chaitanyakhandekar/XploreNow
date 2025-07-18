import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

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

    publicId:{
        type:String
    },

    phone: {
        type: String
    },

    role: {
        type: String,
        enum: ["user"],
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
    ],

    refreshToken:{
        type:String
    }

}, { timestamps: true })


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            username:this.username,
            fullName:this.fullName,
            role:this.role
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

userSchema.plugin(mongooseAggregatePaginate)

export const User =  mongoose.model("User", userSchema)
