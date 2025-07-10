import mongoose,{Schema} from "mongoose";

const adminSchema = new Schema({

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"admin"
    }

},{timestamps:true})

export const Admin = mongoose.model("Admin" , adminSchema)