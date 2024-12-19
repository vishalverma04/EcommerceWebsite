import dotenv from 'dotenv'

dotenv.config({path:"./.env"})
import { createClient } from 'redis';


const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host:process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});
const connectRedis=async()=>{
try {
        const instance=await redisClient.connect()
        console.log(`Redis connected Successfull... `)
} catch (error) {
    console.log('Redis connection failed... ',error)
}
}

export  {connectRedis,redisClient};