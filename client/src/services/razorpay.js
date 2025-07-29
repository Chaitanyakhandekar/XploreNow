import { api } from "../api/api";

// 1️⃣ Load SDK once
export const loadRazorpayScript = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true); // already loaded
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });

// 2️⃣ Create order on backend
export async function createOrder({ tripId, totalBookings, amount }) {
  const { data } = await api.post("/payments/razorpay/order", {
    tripId,
    totalBookings,
    amount,
    currency:"INR"              // amount in paise
  });
  // Expect { order: { id, amount, currency } }
  console.log(data.order)
  return {
    orderId:  data.order.id,
    amount:   data.order.amount,
    currency: data.order.currency
  };
}

// 3️⃣ Launch checkout
export function launchRazorpay({ orderId, amount, currency, onSuccess }) {
  const options = {
    key: "rzp_test_Ywuv8xd4yI0fuM",
    amount: amount.toString(),
    currency,
    name: "XploreNow",
    description: "Trip Booking",
    order_id: orderId,
    handler: onSuccess,
    theme: { color: "#00A99D" }
  };
  new window.Razorpay(options).open();
}


export const verifyPayment = async (res)=>{

  const payload = {
          razorpay_order_id:res?.razorpay_order_id || localStorage.getItem("orderId"),
          razorpay_payment_id:res?.razorpay_payment_id || localStorage.getItem("paymentId"),
          razorpay_signature:res?.razorpay_signature || localStorage.getItem("signature"),
          amountPaid:localStorage.getItem("tripAmount"),
          paymentMode:"razorpay",
          tripId:localStorage.getItem("tripId"),
          totalBookings:localStorage.getItem("totalBookings"),
        }

  try {

      const response = await api.post("/payments/razorpay/verify",payload)
      console.log(response)

      if(response.data.success===true){
        return {
          success:true,
          message:"Payment Verified."
        }
      }

      return {
          success:false,
          message:"Payment Unverified."
        }
  } catch (error) {

    return {
          success:false,
          message:error.message
        }
  }

}