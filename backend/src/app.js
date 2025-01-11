import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


app.get('/ok',(req,res)=>{
    res.send('server is running well')
})

///////////////////////
import productRoutes from './routes/product.routes.js'
app.use('/api/v1/products',productRoutes)

import userRouter from './routes/user.routes.js'
app.use('/api/v1/users',userRouter)

import adminRouter from './routes/admin.routes.js'
app.use('/api/v1/admin',adminRouter)

//////////////////////

import paymentRoutes from './routes/payment.routes.js'

app.use('/api',paymentRoutes)

app.get('/api/getkey',(req,res)=>{
    res.status(200).json({key:process.env.RAZORPAY_API_KEY})
})

///////////////////////


export {app}