const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db.config")
require("dotenv").config()

const PORT = process.env.PORT || 3000
const market_app = express()

market_app.use(cors())
market_app.use(cookieParser())
market_app.use(express.json())




connectDB()

market_app.listen(PORT, ()=> {
    console.log("server running at: " +PORT)
})