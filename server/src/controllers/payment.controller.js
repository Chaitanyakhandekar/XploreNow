import { razorpayInstance } from "../config/razorpay.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";

const createOrder = asyncHandler(async (req, res) => {
  const { amount, currency = "INR" } = req.body;

  const options = {
    amount: amount * 100, // Convert to paise
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

  // Save booking details in DB (optional)
  res.status(200).json({ success: true, message: "Payment verified" });
});


export {
    createOrder,
    verifyPayment
}