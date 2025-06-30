import dotenv from "dotenv"
import {connectDB} from "./db/db.js";
import server from "./app.js"

const port = process.env.PORT || 4000
;connectDB()
    .then(()=>{
        server.listen(port,()=>{
            console.log(`Server XploreNow is Listening on http://localhost:${port}`)
        })
    })
    .catch((error)=>{
        console.log("Error While Establishing Connection")
    })