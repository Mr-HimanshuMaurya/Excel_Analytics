import express from 'express';
import mongoose from 'mongoose';
import {createServer} from 'node:http';
import cors from 'cors';
import adminRoutes from "./routes/adminRoute.js";
import userRoutes from "./routes/userRoute.js"
const app = express();
const server = createServer(app);

app.set("port", process.env.PORT || 8080);
app.use(cors());
app.use(express.json({limit:"100kb"}));
app.use(express.urlencoded({limit:"100kb", extended:true}));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://himanshu:haryanahr51@himanshu.vvjwmwm.mongodb.net/?retryWrites=true&w=majority&appName=Himanshu")
    console.log(`Mongoose connection host :${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log(`Server running on port ${app.get("port")}`);
    });
};
start()