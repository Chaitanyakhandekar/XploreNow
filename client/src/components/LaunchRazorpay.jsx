export const LaunchRazorpay = () => {
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