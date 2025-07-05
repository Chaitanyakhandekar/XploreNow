import Router from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTAgency} from "../middlewares/verifyJWTAgency.middleware.js"
import 
{
    createTrip
}
from "../controllers/trip.controller.js"

const router = Router()

router.route("/create").post(verifyJWTAgency,upload.array("images",5) , createTrip)

export default router;