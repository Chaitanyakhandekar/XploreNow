import Router from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWTAgency} from "../middlewares/verifyJWTAgency.middleware.js"
import 
{
    createTrip,
    updateTrip,
    deleteTrip,
    getTripById,
    getAllAgencyTrips,
    getAllPublicTrips,
    getAllTripParticipants,
    getTripByIdForUser,
    getUserTrips
}
from "../controllers/trip.controller.js"
import { verifyOwnership } from "../middlewares/verifyOwnership.middleware.js"
import { filterOptions } from "../middlewares/filterOptions.middleware.js"
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js"

const router = Router()

router.route("/create").post(verifyJWTAgency,upload.array("images",5) , createTrip)
router.route("/update-trip/").patch(verifyJWTAgency,verifyOwnership,updateTrip)
router.route("/user-trips/").get(verifyJWT,filterOptions,getUserTrips)
router.route("/verify-ownership/").get(verifyJWTAgency,verifyOwnership)
router.route("/delete-trip/:tripId").get(verifyJWTAgency,verifyOwnership,deleteTrip)
router.route("/get/:tripId").get(verifyJWTAgency,verifyOwnership,getTripById)
router.route("/get-user/:tripId").get(verifyJWT,getTripByIdForUser)
router.route("/participants/all/:tripId").get(verifyJWTAgency,verifyOwnership,getAllTripParticipants)
router.route("/agency-trips/").get(verifyJWTAgency,filterOptions,getAllAgencyTrips)
router.route("/all/").get(filterOptions,getAllPublicTrips)
router.route("/filters/").get(verifyJWTAgency,filterOptions)

export default router;