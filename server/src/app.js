import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import cron from "node-cron"
import { updateTripsStatus } from "./cron/updateTripsStatus.js"

const server = express()

server.use(cors({
    origin: "*",
    credentials:false
}))

server.use(express.json({limit:"16kb"}))
server.use(express.urlencoded({extended:true , limit:"16kb"}))
server.use(express.static("public"))
server.use(cookieParser())

cron.schedule("*/10 * * * *", async () => {
    console.log("CRON JOB IS RUNNING FOR UPDATING TRIP STATUS")
    await updateTripsStatus()
})


import userRouter from "./routes/user.route.js"
import agencyRouter from "./routes/agency.route.js"
import tripRouter from "./routes/trip.route.js"
import paymentRouter from "./routes/payment.route.js"
import bookingRouter from "./routes/booking.route.js"

server.use("/api/v1/users" , userRouter)
server.use("/api/v1/agencies" , agencyRouter)
server.use("/api/v1/trips" , tripRouter)
server.use("/api/v1/payments" , paymentRouter)
server.use("/api/v1/bookings" , bookingRouter)

export default server;
