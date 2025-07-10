# 🏗️ System Architecture – XploreNow

Welcome to the official **System Architecture** guide for **XploreNow**, a production-grade, scalable, and secure travel and trek booking platform.

---

## 🧩 Core Modules Overview

```txt
+-------------------+       +------------------+       +------------------+
|     Frontend      | <---> |     Backend       | <---> |    Database      |
| (Next.js + Tailwind) |     | (Node.js + Express) |     | (MongoDB + Mongoose) |
+-------------------+       +------------------+       +------------------+

```

---

### ⚙️ High-Level Architecture
```bash

                                ┌───────────────┐
                                │  Frontend UI  │ ◄────── Users / Agencies
                                └──────┬────────┘
                                       │
                                       ▼
                           ┌────────────────────────┐
                           │     API Gateway (BE)   │
                           │  Express.js REST APIs  │
                           └──────┬────────┬────────┘
                                  │        │
                   ┌─────────────▼──┐   ┌──▼─────────────┐
                   │  Auth & User   │   │  Trip Manager  │
                   │  Controller    │   │  Controller    │
                   └───────────────┘   └────────────────┘
                        │                        │
                        ▼                        ▼
               ┌────────────────┐       ┌──────────────────┐
               │  JWT / Cookies │       │  Cloudinary + FS │
               └────────────────┘       └──────────────────┘
                        │                        │
                        ▼                        ▼
               ┌──────────────────────┐   ┌─────────────────────┐
               │     MongoDB Atlas    │   │ External Services    │
               │  (User, Agency, Trip │   │ - Razorpay / Stripe  │
               │   Booking, Review)   │   │ - Twilio / WhatsApp  │
               └──────────────────────┘   └─────────────────────┘
```

--- 

### 🧠 Micro-Modules Breakdown

### 1. Frontend (Client)
```bash
Framework: Next.js + TailwindCSS

Renders dynamic pages (SSR/SSG)

Role-based UI (Admin, Agency, User)

Integrates with APIs via Axios
```

### 2. Backend (API Server)
```bash
Framework: Node.js + Express.js

Authentication: JWT, HttpOnly Cookies

Modular Controllers: User, Agency, Trip, Payment

Request Validation: Zod / Joi
```

### 3. Database Layer
```bash
Database: MongoDB Atlas

ODM: Mongoose

Models:

User, Agency, Trip, Booking, Review, Payment, Notification
```

### 4. File & Media Storage
```bash
Library: Multer for file uploads

Cloud Storage: Cloudinary for media URLs

Local fallback: fs for dev mode
```

### 5. Authentication & Security
```bash
JWT-based access/refresh tokens

Secured with HttpOnly, SameSite, and Secure cookies

Passwords hashed using bcryptjs
```
---

### 6. Third-Party Services

| Purpose        | Service           |
| -------------- | ----------------- |
| Payments       | Razorpay / Stripe |
| Messaging      | Twilio / WhatsApp |
| Media Hosting  | Cloudinary        |
| Email Delivery | Resend / SendGrid |


### 📦 Folder Structure (Backend)
```bash
src/
├── controllers/
│   └── user.controller.js
├── models/
│   └── User.model.js
├── routes/
│   └── user.routes.js
├── middlewares/
│   └── auth.middleware.js
├── utils/
│   └── cloudinary.js
├── config/
│   └── db.js
└── index.js
```

---

### 🧪 Testing Strategy
Unit Tests – Jest + Supertest for API routes

Integration Tests – MongoDB Test DB

Load Testing – (Optional) Postman/Newman or Artillery

--- 

### 🚀 Deployment Architecture
```bash
+------------------+     +------------------+
|  Vercel (FE)     | --> |  Railway / Render |
|  (Next.js SSR)   |     |  (Express.js BE)  |
+------------------+     +------------------+
            │                        │
            ▼                        ▼
    CDN + Edge Functions      MongoDB Atlas + Cloudinary

```
CI/CD: GitHub Actions / Vercel Hooks
Domains: xplorenow.com + admin.xplorenow.com

---
### 🛡️ Security Practices

HTTPS enforced

CORS whitelisted

Input validation on all endpoints

Rate limiting & brute-force protection

Admin routes protected via role-based guards

---

### 📈 Scalability Plan
| Layer        | Scale Method                        |
| ------------ | ----------------------------------- |
| Frontend     | Vercel + CDN                        |
| Backend      | Horizontal scaling (stateless APIs) |
| Database     | MongoDB Atlas + Auto Sharding       |
| Media        | Cloudinary + Lazy Loading           |
| Queue System | Redis-based for heavy ops (v6+)     |

---

### 📌 Future Improvements

Switch to Microservices with services like:

Booking Service

Notification Service

Review & Rating Engine

Use Redis for caching trip data

Elasticsearch for fast trek/trip search

