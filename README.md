# 🌍 XploreNow – Production-Grade Travel & Trekking Platform

XploreNow is a **scalable, secure, and real-world production-grade travel booking application** built for travel enthusiasts and agencies. Users can register, login, update profiles, and manage trips while agencies can handle bookings and listings with ease.

---

## 🚀 Tech Stack

| Layer       | Tech                                                  |
|-------------|--------------------------------------------------------|
| Backend     | Node.js, Express.js                                   |
| Database    | MongoDB (Atlas), Mongoose ODM                         |
| Auth        | JWT (Access + Refresh Tokens), Cookie-based Auth      |
| Cloud       | Cloudinary (Image Uploads), Multer                    |
| Dev Tools   | Nodemon, Dotenv, Morgan, ESLint                       |
| Hosting     | Coming Soon – Fly.io / Render / Railway               |

---

## 📁 Folder Structure

```bash
XploreNow/
│
├── src/
│ ├── controllers/ # Route handlers (user, auth, etc.)
│ ├── models/ # Mongoose models (User, Agency, etc.)
│ ├── middlewares/ # Auth & error middleware
│ ├── routes/ # API routes (v1)
│ ├── services/ # Business logic / reusable functions
│ ├── constants.js
│ ├── utils/ # Helper functions (e.g., cloud upload)
│ └── db/ # MongoDB connection setup
│
├── .env.example # Sample environment variables
├── package.json
├── README.md
└── server.js / index.js # Entry point
```


---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/xplorenow.git
cd xplorenow
```
---

## 2. Install dependencies
```bash
npm install
```
---

### 3. Setup .env file
Create a .env file in the root with the following:

```bash
PORT=8000
MONGODB_URL=your_mongodb_connection_url
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_EXPIRY=10d
ALLOW_ORIGIN=http://localhost:3000
```
---

### 4. Start the server
```bash
npm run dev
```
---

### 🔐 Auth Services Implemented

| Route                          | Method | Description                  |
| ------------------------------ | ------ | ---------------------------- |
| `/api/v1/auth/register`        | POST   | Register user                |
| `/api/v1/auth/login`           | POST   | Login user (JWT + Cookie)    |
| `/api/v1/auth/logout`          | GET    | Logout user (clears cookies) |
| `/api/v1/auth/refresh`         | GET    | Refresh access token         |
| `/api/v1/user/profile`         | GET    | Get logged-in user profile   |
| `/api/v1/user/update-profile`  | PATCH  | Update username/fullName     |
| `/api/v1/user/update-avatar`   | PATCH  | Upload & update avatar image |
| `/api/v1/user/update-password` | PATCH  | Change password              |

---

### 🏢 Agency Services (v1)

| Route                            | Method | Description                        |
| -------------------------------- | ------ | ---------------------------------- |
| `/api/v1/agency/register`        | POST   | Register agency                    |
| `/api/v1/agency/login`           | POST   | Login agency (JWT + Cookie)        |
| `/api/v1/agency/logout`          | GET    | Logout agency                      |
| `/api/v1/agency/profile`         | GET    | Get agency profile                 |
| `/api/v1/agency/update-profile`  | PATCH  | Update agency name/description     |
| `/api/v1/agency/update-logo`     | PATCH  | Upload & update agency logo        |
| `/api/v1/agency/update-password` | PATCH  | Change agency password             |
| `/api/v1/agency/refresh`         | GET    | Refresh access token (agency only) |

---


### 🛡️ Security Features
✅ HTTP-only Cookies (accessToken, refreshToken)

✅ sameSite: "Strict" protection against CSRF

✅ JWT token rotation during refresh

✅ Password hashing with Bcrypt

✅ Role-based auth middleware (user vs agency)

✅ Validation & centralized error handling

---

### 📦 Features Roadmap (WIP)
| Feature                               | Status      |
| ------------------------------------- | ----------- |
| ✅ User Authentication                 | Completed   |
| ✅ JWT Auth + Token Refresh            | Completed   |
| ✅ Profile Avatar Upload (Cloudinary)  | Completed   |
| ✅ Agency Auth + Profile               | Completed   |
| ⏳ Forgot Password / OTP Verification  | In Progress |
| ⏳ Email/Phone OTP Verification System | Planned     |
| ⏳ Agency Dashboard & Trip Listings    | In Progress |
| ⏳ Admin Panel                         | Planned     |
| ⏳ Booking & Payments (Razorpay)       | Planned     |
| ⏳ Real-time Notifications (Socket.io) | Planned     |


 ---

 ### 📄 API Documentation
📌 Postman Collection: Coming Soon
📌 Swagger Docs: Coming Soon (/api-docs)

---

### 🧠 Learning & Experience Gained
This project is a real-world startup-level implementation built to strengthen my backend architecture, security principles, and production-readiness. Built completely from scratch with the goal of becoming pro developer.
