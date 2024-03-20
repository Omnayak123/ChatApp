import express from"express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"

import cookieParser from 'cookie-parser'
import connect from "./db/connect.js";
dotenv.config();
const app=express();

const PORT=process.env.PORT
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.get("/",(req,res)=>{
    res.send("helleo")
})

app.listen(PORT,(req,res)=>{
    connect();
    console.log(`Server is running on port ${PORT}`)
})