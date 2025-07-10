# 👥 XploreNow Team Management Module (v5)

## 📌 Feature Name: Team Management for Enterprise Agencies

> Enable large-scale travel agencies to manage internal team members (Trip Leads) who handle individual trips under one agency brand.

---

## 🧠 Problem Statement

Many established travel agencies operate with multiple team leaders or sub-agents. Currently, XploreNow supports only solo agency logins. There is **no built-in way to assign, track, or manage trips and earnings per team member**.

---

## 🎯 Goal

Introduce a scalable module to allow:
- **Enterprise Agencies** to onboard multiple team members.
- **Trip Leads** to manage trips assigned to them.
- Central agency to view and manage all activity from one dashboard.

---

## 👤 User Types

| Role              | Permissions                                                                 |
|-------------------|------------------------------------------------------------------------------|
| `User`            | Browse, book trips                                                          |
| `Agency`          | Post/manage trips                                                           |
| `EnterpriseAgency`| Manage trips + manage team members (Trip Leads)                             |
| `TripLead`        | View trips assigned to them, manage bookings, update status, see earnings   |

---

## 🧱 Database Schema Changes

### 📁 `Agency` Schema (Extend Existing)
```js
role: {
  type: String,
  enum: ["solo", "enterprise"],
  default: "solo"
},
teamMembers: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "TripLead"
}]
```
---

### 📁 TripLead Schema (New)
```js
name: String,
email: String,
password: String,
phone: String,
assignedAgency: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Agency"
},
tripsLed: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Trip"
}],
earnings: {
  type: Number,
  default: 0
}
```
---

### 🧳 Trip Schema (Additions)
```js
assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "TripLead"
}
```
---

### 🧑‍💻 Feature Scope
✅ EnterpriseAgency Dashboard

    1. Add/Remove team members
    2. Assign trips to members
    3. View trip-wise earnings & feedback per member

✅ TripLead Dashboard

    1. View trips assigned to them
    2. Mark trip as completed
    3. View booking details (read-only)
    4. Track their own earnings (if enabled)

---

### 📐 API Endpoints (High-Level)
| Method | Endpoint                  | Description                                  |
| ------ | ------------------------- | -------------------------------------------- |
| POST   | `/agency/add-team-member` | Add a Trip Lead to the agency                |
| GET    | `/agency/team`            | Get list of team members                     |
| POST   | `/trip/assign-to-lead`    | Assign a TripLead to a specific trip         |
| GET    | `/lead/trips`             | Get all trips assigned to logged-in TripLead |
| GET    | `/lead/earnings`          | View earnings for TripLead                   |
---

### 🔐 Auth & Permissions

    1. TripLead cannot access normal agency dashboard
    2. EnterpriseAgency manages TripLeads only within its scope
    3. Middleware should guard role-based routes: auth("lead"), auth("enterprise")

---

### 📊 Analytics (Optional Future Scope)

    1. Top performing TripLeads
    2. Leader-wise bookings/revenue
    3. Feedback-based leaderboard

---

### 🛠️ Future Enhancements

    1. Role-based earnings auto-calculation
    2. Commission splits (Agency vs. TripLead)
    3. Leader-level reviews and ratings
    4. Team availability calendar
    5. Real-time trip updates via WhatsApp integration

---

### 🚀 Version Rollout Plan

| Phase | Description                                  |
| ----- | -------------------------------------------- |
| v5.0  | Core TripLead onboarding & trip assignment   |
| v5.1  | TripLead dashboard with earnings             |
| v5.2  | Leader performance tracking                  |
| v6.0+ | Commission engine + real-time leader reports |

---

### ✅ Summary
This module unlocks support for professional, large-scale operators who rely on internal teams. It gives XploreNow a huge competitive edge by offering what others don’t: true team delegation and leader management.