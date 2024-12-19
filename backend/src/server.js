import dotenv from 'dotenv'

dotenv.config({path:"./.env"})

import { app } from './app.js'
import connectDB from './config/mongodb.js'
import { connectRedis } from './config/redis.js'


connectDB()
.then(async()=>{
  await connectRedis()
    const port=process.env.PORT || 8000
    app.listen(port,()=>{
        console.log(`server is running at port ${port}`)
    })
})
.catch((error)=>{
  console.log(`mongodb connection error...`,error)
})
