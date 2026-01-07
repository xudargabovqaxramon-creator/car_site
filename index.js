const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db.config")
const AuthRouter = require("./router/auth.routes")
const BrendRouter = require("./router/brends.routes")
require("dotenv").config()

const PORT = process.env.PORT || 3000
const market_app = express()

market_app.use(cors())
market_app.use(cookieParser())
market_app.use(express.json())

// Routes 
market_app.use(AuthRouter)
market_app.use(BrendRouter)

connectDB()

market_app.listen(PORT, ()=> {
    console.log("server running at: " +PORT)
})