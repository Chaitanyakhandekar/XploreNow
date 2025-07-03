import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const agencySchema = new Schema({

    name: {
        type: String,
        required: true,
        lowercase:true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
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

    role: {
        type: String,
        default: "agency",
        enum: ["agency"]
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
    },
    refreshToken:{
        type:String
    }

}, { timestamps: true })


agencySchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    
    this.password = await bcrypt.hash(this.password,10)
    next()
})

agencySchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

agencySchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            role:"agency",
            name:this.name,
            email:this.email,
            isVerified:this.isVerified
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

agencySchema.methods.generateRefreshToken = function(){
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

export const Agency =  mongoose.model("Agency", agencySchema)
