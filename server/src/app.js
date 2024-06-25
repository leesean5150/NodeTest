import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

import config from "../config.js";
import productRoutes from "./test/routes/products.js";
import { UserRouter } from "./auth/routes/user.js";
import { User } from "./auth/models/User.js";

const connectToDB = async () => {
  try {
    await mongoose.connect(config.db_uri, {});
    const existingSuperUser = await User.findOne({ role: "admin" });
    if (existingSuperUser) {
      console.log("Superuser already exists.");
      return;
    }
    const hashpassword = await bcrypt.hash(process.env.SUPERUSER_PASSWORD, 10);
    const superUser = new User({
      username: process.env.SUPERUSER_USERNAME,
      email: process.env.SUPERUSER_EMAIL,
      password: hashpassword,
      role: "admin",
    });
    await superUser.save();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONT_END_URL],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/products", productRoutes);
app.use("/auth", UserRouter);

await connectToDB();

export default app;
