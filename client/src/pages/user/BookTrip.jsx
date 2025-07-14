// components/RazorpayButton.jsx
import { useEffect } from "react";

export default function RazorpayButton({
  amount = 50000,                // paise → ₹500.00
  orderId = "order_Qr0UA5hINdzoqQ",
  onSuccess = () => {},
}) {
  /* Dynamically load Razorpay script once -------------------------------- */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  /* Payment handler ------------------------------------------------------- */
  const launchRazorpay = () => {
    const options = {
      key: "rzp_test_Ywuv8xd4yI0fuM",     // 🔑  Replace with LIVE key in prod
      amount: amount.toString(),          // must be string
      currency: "INR",
      name: "XploreNow",
      description: "Trek Booking",
      order_id: orderId,                  // generated on your backend
      handler: (res) => {
        alert(`Payment successful! ID: ${res.razorpay_payment_id}`);
        console.log("Payment details:", res);
        onSuccess(res);
      },
      theme: { color: "#00A99D" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={launchRazorpay}
      className="px-6 py-3 rounded bg-[#00A99D] text-white hover:bg-opacity-90"
    >
      Pay ₹{amount / 100}
    </button>
  );
}
