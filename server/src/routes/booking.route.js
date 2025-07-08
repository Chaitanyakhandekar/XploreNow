import { Router } from "express";
import 
{
    createBooking
}
from "../controllers/booking.controller.js"
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import {createOrder,verifyPayment} from "../controllers/payment.controller.js"
const router = Router()

router.route("/create-booking").post(verifyJWT,createBooking)

export default router;