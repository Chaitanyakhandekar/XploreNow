import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {uploadFileOnCloudinary} from "../utils/cloudinary.js"
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import
{
    registerUser,
    loginUser,
    logoutUser,
    updateProfile,
    updateAvatar,
    updatePassword,
    refreshAccessToken,
    getUserProfile,
    getCurrentUser
}
from "../controllers/user.controller.js"

const router = Router()

router.route("/me").get(verifyJWT , getCurrentUser)
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJWT,logoutUser)
router.route("/update-profile").patch(verifyJWT,updateProfile)
router.route("/update-avatar").patch(verifyJWT,upload.single("avatar"),updateAvatar)
router.route("/update-password").patch(verifyJWT,updatePassword)
router.route("/refresh-access-token").get(refreshAccessToken)
router.route("/profile").get(verifyJWT,getUserProfile)


export default router;