import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes

import adminRoutes from "./routes/admin.routes.js"
import articleRoutes from "./routes/article.routes.js"
import magazineRoutes from "./routes/magazine.routes.js"

// routes declaration

app.use("/api/v1/admin", adminRoutes)
app.use("/api/v1/article", articleRoutes)
app.use("/api/v1/article/readmore", articleRoutes)
app.use("/api/v1/magazine", magazineRoutes)

//http://localhost:8000/api/v1/admin/register

export {app}