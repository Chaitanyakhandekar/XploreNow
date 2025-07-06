import Router from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTAgency} from "../middlewares/verifyJWTAgency.middleware.js"
import 
{
    createTrip,
    updateTrip,
    deleteTrip
}
from "../controllers/trip.controller.js"
import { verifyOwnership } from "../middlewares/verifyOwnership.middleware.js"

const router = Router()

router.route("/create").post(verifyJWTAgency,upload.array("images",5) , createTrip)
router.route("/update-trip/").patch(verifyJWTAgency,verifyOwnership,updateTrip)
router.route("/verify-ownership/").get(verifyJWTAgency,verifyOwnership)
router.route("/delete-trip/:tripId").get(verifyJWTAgency,verifyOwnership,deleteTrip)

export default router;