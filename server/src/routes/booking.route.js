import { Router } from "express";
import 
{
    createBooking,
    getAllAgencyBookings,
    canBookTickets
}
from "../controllers/booking.controller.js"
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import {verifyJWTAgency} from "../middlewares/verifyJWTAgency.middleware.js"
import {createOrder,verifyPayment} from "../controllers/payment.controller.js"
const router = Router()

router.route("/create-booking").post(verifyJWT,createBooking)
router.route("/agency/all").get(verifyJWTAgency,getAllAgencyBookings)
router.route("/can-book/").get(verifyJWT,canBookTickets)

export default router;