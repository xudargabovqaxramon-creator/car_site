require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db.config")
const errorMiddleware = require("./middleware/error-middleware")
const AuthRouter = require("./router/auth.routes")
const BrendRouter = require("./router/brends.routes")
const CarRouter = require("./router/car.routes")
const ImgRouter = require("./router/img.routes")
const logger = require("./utils/logger")
const profileRouter = require("./router/profile.routes")

const PORT = process.env.PORT || 3000
const market_app = express()


market_app.use(cors())
market_app.use(cookieParser())
market_app.use(express.json())

// Routes 
market_app.use(AuthRouter)
market_app.use(BrendRouter)
market_app.use(CarRouter)
market_app.use(profileRouter)
market_app.use(ImgRouter)

market_app.use(errorMiddleware)

logger.info("sayt ishladi")
connectDB()



market_app.listen(PORT, ()=> {
    console.log("server running at: " +PORT)
})