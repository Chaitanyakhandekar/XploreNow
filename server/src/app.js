import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const server = express()

server.use(cors({
    origin:process.env.ALLOW_ORIGIN || "*",
    creadentials:true
}))

server.use(express.json({limit:"16kb"}))
server.use(express.urlencoded({extended:true , limit:"16kb"}))
server.use(express.static("public"))
server.use(cookieParser())



import userRouter from "./routes/user.route.js"

server.use("/api/v1/users" , userRouter)

export default server;