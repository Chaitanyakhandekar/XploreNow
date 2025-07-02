import mongoose from "mongoose";
import dotenv from "dotenv"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { uploadFileOnCloudinary } from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"
import { generateAccessAndRefreshToken } from "../utils/generateAccessAndRefreshToken.js"
import { httpOnlyCookie } from "../constants.js";
import jwt from "jsonwebtoken"



const registerUser = asyncHandler(async (req, res) => {

    const { username, email, fullName, password, phone } = req.body

    if (!(username && email && fullName && password && phone)) {
        throw new ApiError(400, "All Fields are Required")
    }

    if ([username, email, fullName, password].some((f) => f.trim() === "")) {
        throw new ApiError(400, "No Fields Should be Empty")
    }

    if (password.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long.");
    }

    const user = await User.findOne({
        email
    })

    if (user) {
        throw new ApiError(400, "User with this Email Already Exists")
    }

    const newUser = await User.create({
        username,
        email,
        fullName,
        password,
        phone,
        avatar: "http://res.cloudinary.com/drftighpf/image/upload/v1751458090/f5ozv63h6ek3ujulc3gg.jpg"
    })

    if (!newUser) {
        throw new ApiError(500, "Server Error")
    }


    return res
        .status(201)
        .json(
            new ApiResponse(200, {
                username: newUser.username,
                email: newUser.email,
                fullName: newUser.fullName,
            }, "User Registered Successfully")
        )

})

const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    if (!(email && password)) {
        throw new ApiError(400, "Both Fields are Required")
    }

    if (email.trim() === "" || password.trim() === "") {
        throw new ApiError(400, "Email or Password cannot be Empty")
    }

    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new ApiError(400, "Account doesn't Exists")
    }

    const isCorrectPassword = await user.isCorrectPassword(password)

    if (!isCorrectPassword) {
        throw new ApiError(400, "Incorrect Password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    if (!(accessToken && refreshToken)) {
        throw new ApiError(500, "Server Error")
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, { ...httpOnlyCookie, sameSite: "Strict" })
        .cookie("refreshToken", refreshToken, { ...httpOnlyCookie, sameSite: "Strict" })
        .json(
            new ApiResponse(200, {
                username: user.username,
                email: user.email,
                fullName: user.fullName
            },
                "Login Successfully"
            )
        )

})

const logoutUser = asyncHandler(async (req, res) => {      // verifyJWT middleware

    const user = await User.findById(req.user._id)

    if (!user) {
        throw new ApiError(400, "User not Found")
    }

    user.refreshToken = undefined

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .clearCookie("accessToken", { ...httpOnlyCookie, sameSite: "Strict" })
        .clearCookie("refreshToken", { ...httpOnlyCookie, sameSite: "Strict" })
        .json(
            new ApiResponse(200, "Logout Successfull")
        )

})

const updateProfile = asyncHandler(async (req, res) => {      // verifyJWT middleware

    const { username, fullName } = req.body

    if (!(username || fullName)) {
        throw new ApiError(400, "Atleast one Field is Required")
    }

    if ((username && username.trim() === "") || (fullName && fullName.trim() === "")) {
        throw new ApiError(400, "Field for Update Cannot be Empty")
    }

    let update = {}
    if (username) update = { ...update, username: username }
    if (fullName) update = { ...update, fullName: fullName }

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: update
        },
        {
            new: true
        }
    ).select("-password -refreshToken -phone")

    if (!updatedUser) {
        throw new ApiError(500, "Server Error")
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedUser, "User Profile Updated Successfully")
        )
})

const updateAvatar = asyncHandler(async (req,res)=>{        // verifyJWT , multer middleware

    const avatarLocalpath = req.file?.path

    if(!avatarLocalpath){
        throw new ApiError(400,"Avatar image is Required")
    }

    const avatar = await uploadFileOnCloudinary(avatarLocalpath)

    if(!avatar){
        throw new ApiError(500,"Server Error")
    }

    const updatedAvatar = await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                avatar:avatar.secure_url
            }
        },
        {
            new:true
        }
    ).select("-password -phone -refreshToken")

    if(!updatedAvatar){
        throw new ApiError(500,"Server Error")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,updatedAvatar,"Avatar Updated Successfully")
            )

})

const updatePassword = asyncHandler(async (req,res)=>{      // verifyJWT middleware

    const {currentPassword,newPassword} = req.body

    if(!(currentPassword && newPassword)){
        throw new ApiError(400,"Both current and new password are required fields")
    }

    if(currentPassword.trim() === "" || newPassword.trim() === ""){
        throw new ApiError(400,"No field can be Empty")
    }

    const user = await User.findById(req.user._id)

    const isCorrectPassword = await user.isCorrectPassword(currentPassword)

    if(!isCorrectPassword){
        throw new ApiError(400,"Incorrect Password")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(req.user._id)

    if (!(accessToken && refreshToken)) {
        throw new ApiError(500, "Server Error")
    }

    user.password = newPassword

    await user.save()

    return res
            .status(200)
            .cookie("accessToken",accessToken,{...httpOnlyCookie , sameSite:"Strict"})
            .cookie("refreshToken",refreshToken,{...httpOnlyCookie , sameSite:"Strict"})
            .json(
                new ApiResponse(200,null,"Password Updated Successfully")
            )
})

const refreshAccessToken = asyncHandler(async (req,res)=>{

    const encodedRefreshToken = req.cookies?.refreshToken

    if(!encodedRefreshToken || encodedRefreshToken.trim() === ""){
        throw new ApiError(500,"Server Error")
    }

    let decodedRefreshToken;

    try {
         decodedRefreshToken = jwt.verify(encodedRefreshToken,process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        throw new ApiError(500,"Invalid or expired refresh token")
    }

    if(!decodedRefreshToken){
        throw new ApiError(500,"Server error")
    }

    const user = await User.findById(decodedRefreshToken._id)

    if(!user){
        throw new ApiError(500,"User not found")
    }

    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    if(!(accessToken && refreshToken)){
        throw new ApiError(500,"Server Error")
    }

    if(user.refreshToken !== encodedRefreshToken){
        throw new ApiError(500,"Refresh token is invalid or has been rotated")
    }

    return res
            .status(200)
            .cookie("accessToken",accessToken,{...httpOnlyCookie , sameSite:"Strict"})
            .cookie("refreshToken",refreshToken,{...httpOnlyCookie , sameSite:"Strict"})
            .json(
                new ApiResponse(200,null,"AccessToken Refreshed Successfully")
            )

})

const getUserProfile = asyncHandler(async (req,res)=>{      // verifyJWT middleware

    const user = await User.findById(req.user._id)

    if(!user){
        throw new ApiError(400,"User not found")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(200,{
                    _id:user._id,
                    username:user.username,
                    fullName:user.fullName,
                    email:user.email,
                    phone:user.phone,
                    avatar:user.avatar,
                    isVerified:user.isVerified,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt

                },
            "User Profile Fetched Successfully")
            )

})

export {
    registerUser,
    loginUser,
    logoutUser,
    updateProfile,
    updateAvatar,
    updatePassword,
    refreshAccessToken,
    getUserProfile
}