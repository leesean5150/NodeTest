// change import statement to the code below if "type":"module", is not set in package.json:
// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { UserRouter } from "./routes/user.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: [process.env.FRONT_END_URL],
  credentials: true,
}));
app.use(cookieParser());

app.use("/auth", UserRouter);

mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
