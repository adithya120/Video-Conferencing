import express from "express";
import mongoose from "mongoose";
import {createServer} from "node:http" ;
import { connectToSocket } from "./controllers/socketManager.js";
import {Server} from "socket.io";
import cors from "cors" ;
import userRoutes from "./routes/userRouter.js";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port" , (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb",extended:true}));

app.use("/api/v1/users",userRoutes);


const start = async()=>{
    const connectionDb = mongoose.connect("mongodb+srv://user123:adityaDbUser@cluster0.ms6oyje.mongodb.net/")
    .then(()=>{
        console.log(`db is sucessfully connected `);
    })
    .catch(
        (error)=>console.log(error)
    )        
    
    server.listen(app.get("port") , ()=>{
    console.log("app is running at port 8000")
})
}

start();