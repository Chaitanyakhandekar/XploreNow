import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {uploadFileOnCloudinary} from "../utils/cloudinary.js"
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import
{
    registerUser,
    loginUser,
    logoutUser,
    updateProfile
}
from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(verifyJWT,logoutUser)
router.route("/update-profile").patch(verifyJWT,updateProfile)

export default router;