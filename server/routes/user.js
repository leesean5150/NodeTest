import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";

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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user) {
    return res.json({ message: "Invalid username" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Invalid password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { maxAge: 360000, httpOnly: true });
  return res.json({ status: true, message: "login successful" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.json({ message: "Invalid email" });
    }

    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset Password",
      text: process.env.FRONT_END_URL + `/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return res.json({ status: false, message: "Error sending email" });
      } else {
        return res.json({ status: true, message: "Email sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashPassword });
    return res.json({ status: true, message: "Password has been updated" });
  } catch (err) {
    return res.json({ status: false, message: "Invalid token" });
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "Unauthorized" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next();
  } catch (err) {
    return res.json({ status: false, message: "Unauthorized" });
  }
};

router.get("/verify", verifyUser, async (req, res) => {
  return res.json({ status: true, message: "Authorized" });
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logged out" });
});

export { router as UserRouter };