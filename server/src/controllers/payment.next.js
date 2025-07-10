import { razorpayInstance } from "../config/razorpay.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";

const createOrder = asyncHandler(async (req, res,next) => {
  const { amount, currency = "INR" } = req.body;

  const options = {
    amount: amount * 100, // Convert to paise
    currency,
    receipt: `receipt_${Date.now()}`
  };

  const order = await razorpayInstance.orders.create(options);
//   res.status(200).json({ success: true, order });
  console.log("OrderInfo = ",order)

  if(!order || order.status !== "created"){
    throw new ApiError(400,"Payment Order Error")
  }

  req.payment = {
    order
  }

  return next()
});




const verifyPayment = asyncHandler(async (req, res,next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;


  if(!(razorpay_order_id && razorpay_payment_id && razorpay_signature)){
    throw new ApiError(400,"Payment Error")
  }

  const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
     throw new ApiError(400,"Invalid Signatures")
  }

  // Save booking details in DB (optional)
  req.payment = {...payment , isPaymentVerified:true}
  return next()
});


export {
    createOrder,
    verifyPayment
}