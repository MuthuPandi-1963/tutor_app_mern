import express from 'express'
import {config} from 'dotenv'
import DBConfig from './db/db.config.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import AuthRoutes from './routes/authRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';
import BookingRoutes from './routes/booking.routes.js';
import reviewRoutes from './routes/review.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import parentRoutes from './routes/parent.routes.js';
config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
const corsOptions = {
    origin: process.env.FRONTEND_URL, // frontend URL (adjust for production)
    credentials: true, // to allow cookies/token headers
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api",AuthRoutes)
app.use("/api",subjectRoutes)
app.use("/api",tutorRoutes)
app.use('/api/bookings', BookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/parent', parentRoutes);
app.get("/",(req,res)=>{
    res.status(200)
    .json({
        message : "Welcome to Tutor App"
    })
})

app.listen(port,()=>{
    console.log("server running Successfully on PORT" ,port)
    DBConfig()
    
})