import mongoose from "mongoose"
import {asyncHandler} from "../utils/asyncHandler.js"

const verifyJWT = asyncHandler(async (req,res,next)=>{

    const accessToken = req.cookies?.accessToken



})