# 💳 Payment Gateway Integration – Razorpay

This document explains how Razorpay is integrated into the project and how to switch between **Test** and **Live** environments.

---

## 🔧 Installation & Configuration

Install Razorpay SDK:

```bash
npm install razorpay
```
---

 Razorpay Config:
```js
import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
```
---

### 🧪 Test Environment

Used for local development and sandbox payments.

✅ Razorpay Dashboard
Go to: https://dashboard.razorpay.com

Toggle Test Mode (top-right)

✅ Test Credentials

```bash
RAZORPAY_KEY_ID=rzp_test_XXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXX
```
---
### 🧪 Use Test Cards

Card Number: 4111 1111 1111 1111
CVV: 123
Expiry: Any future date
Name: Test User

---

### 🚀 Live Environment

Use this in production when your Razorpay account is activated.

✅ Update .env
```bash
RAZORPAY_KEY_ID=rzp_live_XXXXXXXX
RAZORPAY_KEY_SECRET=XXXXXXXXXXXX
```
---

### ⚠️ Note
1. Never hardcode keys in source files.
2. Do not push .env files to GitHub.
3. Always keep live keys secret.

---

### 🔁 Webhook Support (Optional but Recommended)

If you use webhooks to verify payment status or handle refunds:

✅ Setup on Razorpay Dashboard:
URL: https://yourdomain.com/api/payment/webhook

Events: payment.captured, payment.failed, order.paid, etc.

Secret: RAZORPAY_WEBHOOK_SECRET

✅ .env
```bash
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
```
---

### 🧪 Switching Environments
Use different .env files:
```bash
.env.test          → Test Razorpay keys
.env.production    → Live Razorpay keys
```
Use a process manager like PM2 or scripts for loading correct envs:
```bash
# test
NODE_ENV=test dotenv -e .env.test node server.js

# production
NODE_ENV=production dotenv -e .env.production node server.js
```
---

### ✅ Integration Checklist

| Feature                     | Status      |
| --------------------------- | ----------- |
| Razorpay SDK Installed      | ✅           |
| Test Environment Configured | ✅           |
| Test Card Payment Flow      | ✅           |
| Live Mode Switching Ready   | ✅           |
| Webhook Secure Integration  | 🔄 Optional |
| `.env` Protected            | ✅           |

---

### 📎 Resources
[Razorpay Docs](https://razorpay.com/docs/)
[Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-upi-details/)
[Webhook Setup](https://razorpay.com/docs/webhooks/)