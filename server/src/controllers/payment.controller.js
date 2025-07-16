import { razorpayInstance } from "../config/razorpay.js";
import { Booking } from "../models/booking.model.js";
import { Trip } from "../models/trip.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createBooking } from "./booking.controller.js";
import crypto from "crypto";

const createOrder = asyncHandler(async (req, res) => {
  const { amount, currency = "INR" , totalBookings , tripId} = req.body;

  const trip = await Trip.findById(tripId)

  if(!trip){
    return res.status(400).json({error:"Trip may have been removed or fully booked. Please refresh the page or explore other available trips."})
  }


  if((trip.currentParticipants + totalBookings) > trip.maxParticipants){
    return res.status(200).json({error:"Unable to complete your booking. The requested number of participants exceeds the available slots for this trip."})
  }

  const options = {
    amount: (amount * totalBookings) * 100, // Convert to paise
    currency,
    receipt: `receipt_${Date.now()}`
  };

  const order = await razorpayInstance.orders.create(options);
  res.status(200).json({ success: true, order });
});




const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid Signature" });
  }
  
  const newBooking = await createBooking(req)

  if(newBooking.success===false){
    return res
        .status(500)
        .json(
          new ApiResponse(500,null,"Booking Failed")
        )
  }

  return res
        .status(201)
        .json(
          new ApiResponse(201,newBooking,"Trip Booked Successfully")
        )
  
});


export {
    createOrder,
    verifyPayment
}