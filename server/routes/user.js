import express from "express";
import bcrypt from "bcrypt";

import { User } from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const uniqueUsername = await User.find({ username }).exec();
  const uniqueEmail = await User.find({ email }).exec();

  if (uniqueUsername.length > 0) {
    return res.json({ message: "Username is already in use" });
  }
  if (uniqueEmail.length > 0) {
    return res.json({ message: "Email is already in use" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();
  return res.json({ status: true, message: "record registered successfully" });
});

export { router as UserRouter };
