import { Router } from "express";
import {
    createOrder,
    verifyPayment
}
from "../controllers/payment.controller.js"
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router()

router.route("/razorpay/order").post(verifyJWT,createOrder)
router.route("/razorpay/verify").post(verifyJWT,verifyPayment)

export default router;