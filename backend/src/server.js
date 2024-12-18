import dotenv from 'dotenv'

dotenv.config({path:"./.env"})

import { app } from './app.js'
import connectDB from './config/mongodb.js'


connectDB()
.then(()=>{
    const port=process.env.PORT || 8000
    app.listen(port,()=>{
        console.log(`server is running at port ${port}`)
    })
})
.catch((error)=>{
  console.log(`mongodb connection error...`,error)
})
