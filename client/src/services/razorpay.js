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
