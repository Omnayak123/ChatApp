import path from "path" 
import userRoutes from "./routes/user.route.js"
import express from"express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from 'cookie-parser'
import connect from "./db/connect.js";
dotenv.config();
import {app,server} from "./socket/socket.js"
const __dirname=path.resolve();
const PORT=5000
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
app.get("/",(req,res)=>{
    res.send("hello")
})

server.listen(PORT,(req,res)=>{
    connect();
    console.log(`Server is running on port ${PORT}`)

})