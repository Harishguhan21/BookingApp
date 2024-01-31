import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import userRoute from "./routes/users.js";
import roomRoute from "./routes/room.js";
import { setHeaders } from "./Utils/middleware.js";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log("Error Occured while connect the db");
  }
};

mongoose.connection.on("connected", () => console.log("connected"));
mongoose.connection.on("disconnected", () => console.log("disconnected"));

app.use(express.json());
app.use(cors());
app.use(setHeaders);
// middlewares

app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/users", userRoute);
app.use("/api/rooms", roomRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8080, () => {
  connect();
});
