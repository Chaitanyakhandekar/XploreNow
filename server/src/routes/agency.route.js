import Router from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTAgency} from "../middlewares/verifyJWTAgency.middleware.js"
import 
{
    registerAgency,
    loginAgency,
    logoutAgency,
    updateProfile,
    updateLogo,
    updatePassword,
    refreshAccessToken,
    getAgencyProfile
}
from "../controllers/agency.controller.js"

const router = Router()

router.route("/register").post(upload.single("logo"),registerAgency)
router.route("/login").post(loginAgency)
router.route("/logout").get(verifyJWTAgency,logoutAgency)
router.route("/update-profile").patch(verifyJWTAgency,updateProfile)
router.route("/update-logo").patch(verifyJWTAgency,upload.single("logo"),updateLogo)
router.route("/update-password").patch(verifyJWTAgency,updatePassword)
router.route("/refresh-access-token").get(refreshAccessToken)
router.route("/profile").get(verifyJWTAgency,getAgencyProfile)


export default router;