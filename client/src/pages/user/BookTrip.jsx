import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  loadRazorpayScript,
  createOrder,
  launchRazorpay
} from "../../services/razorpay";

export  function BookTrip() {
  // Grab trip data from Redux (or props)
  
  const tripId = localStorage.getItem("tripId")
  const tripAmount = localStorage.getItem("tripAmount")
  const totalBookings = localStorage.getItem("totalBookings")
  useEffect(() => {
    if (!tripId) return; // nothing to pay for

    (async () => {
      /* 1. ensure SDK is loaded */
      try {
        await loadRazorpayScript();
      } catch (err) {
        alert(err.message);
        return;
      }

      /* 2. create order on backend */
      let order;
      try {
        order = await createOrder({
          tripId,
          totalBookings: totalBookings || 1,
          amount: tripAmount        // paise
        });
      } catch (err) {
        alert("Order creation failed");
        console.error(err);
        return;
      }

      /* 3. launch Razorpay */
      launchRazorpay({
        ...order,
        onSuccess: (res) => {
          console.log("✅ Payment success", res);
          // TODO: verify signature with backend
        }
      });
    })();
  }, [tripId, tripAmount, totalBookings]);

  // This component only triggers the popup, no UI needed
  return null;
}
