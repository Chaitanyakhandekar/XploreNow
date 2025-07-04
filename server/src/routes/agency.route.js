import Router from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTAgency} from "../middlewares/verifyJWTAgency.middleware.js"
import 
{
    registerAgency,
    loginAgency,
    logoutAgency
}
from "../controllers/agency.controller.js"

const router = Router()

router.route("/register").post(upload.single("logo"),registerAgency)
router.route("/login").post(loginAgency)
router.route("/logout").get(verifyJWTAgency,logoutAgency)


export default router;