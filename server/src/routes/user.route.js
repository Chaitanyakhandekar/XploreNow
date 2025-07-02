import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {uploadFileOnCloudinary} from "../utils/cloudinary.js"
import
{
    registerUser,
    loginUser
}
from "../controllers/user.controller.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

export default router;