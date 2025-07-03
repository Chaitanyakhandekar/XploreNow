import Router from "express"
import {upload} from "../middlewares/multer.middleware.js"
import 
{
    registerAgency
}
from "../controllers/agency.controller.js"

const router = Router()

router.route("/register").post(upload.single("logo"),registerAgency)


export default router;