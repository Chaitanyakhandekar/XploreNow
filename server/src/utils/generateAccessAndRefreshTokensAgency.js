import mongoose from "mongoose";
import { Agency } from "../models/agency.model.js";
import { ApiError } from "./apiError.js";

export const generateAccessAndRefreshTokenAgency = async (agencyId) => {

    try {
        if (!agencyId || !mongoose.Types.ObjectId.isValid(agencyId)) {
            throw new ApiError(400, "Invalid ID")
        }

        const agency = await Agency.findById(agencyId)

        if (!agency) {
            throw new ApiError(400, "Agency Not Found")
        }

        const accessToken = agency.generateAccessToken()
        const refreshToken = agency.generateRefreshToken()

        if (!(accessToken && refreshToken)) {
            throw new ApiError(500, "Server Error")
        }

        agency.refreshToken = refreshToken

        await agency.save({ validateBeforeSave: false });

        return { accessToken, refreshToken }
    } catch (error) {
       throw new ApiError(500, error.message || "Token generation failed");
    }

} 