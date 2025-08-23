import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"
import cluster from "cluster";
import os from "os";

import cron from 'node-cron';
import { carModel } from "./models/carModel.js";
import { bookingModel } from "./models/bookingInfo.js";

import { connectDb } from "./config/database.js"
import { credentials } from "./middleware/credantials.js"; 
import { corsOptions } from "./config/cors.js";
import authRouter from "./routes/authRoute.js";
import bookingRouter from "./routes/bookingRouter.js"
import carRouter from "./routes/carRoutes.js"
import usersRouter from './routes/usersRouiter.js'
import imagekitRouter from './routes/imageKitRouter.js'



dotenv.config();
const server = express();
connectDb();
const Port = process.env.PORT || 5004;

server.use(cookieParser());
server.use(express.json());
server.use(credentials);
server.use(cors(corsOptions));


server.use('/auth',authRouter);
server.use('/car',carRouter);
server.use('/users',usersRouter);
server.use('/booking',bookingRouter);

server.use('/imagekit', imagekitRouter)

mongoose.connection.once('open', () => 
{
    server.listen(Port, ()=>
    {
        console.log("Server started at: " + Port)
    })
})




// Runs every hour to find bookings that ended in the past but car still marked unavailable
// cron.schedule('0 * * * *', async () => {
//     const now = new Date();
//     const expiredBookings = await bookingModel.find({ returnDate: { $lte: now } });
    
//     for (const booking of expiredBookings) {
//         await carModel.findByIdAndUpdate(booking.car, { isAvailable: true });
//     }

//     console.log('Expired bookings processed at', now);
// });


// mongoose.connection.once('open', () => 
// {
//     if(cluster.isPrimary)
//     {
//         const cores = os.cpus().length;
//         for(let i=0; i<cores; i++)
//         {
//             cluster.fork();
//         }
//         cluster.on("exit", ()=>
//         {
//             cluster.fork();
//         })
//     }
//     else
//     {
//         server.listen(Port, ()=>
//         {
//             console.log("Server started at: " + Port)
//         })
//     }
    
// })
