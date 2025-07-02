import mongoose from "mongoose";
import dotenv from "dotenv"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js"
import { Agency } from "../models/agency.model.js"
import { generateAccessAndRefreshTokenAgency } from "../utils/generateAccessAndRefreshTokenAgency.js"
import { httpOnlyCookie } from "../constants.js";
import jwt from "jsonwebtoken"


