import UserModel from '../../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { generateOTP } from '../../utils/genOTP.js'; // Create this helper
import { transporter } from '../../utils/nodemailer.js';

// Register with OTP
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check existing user
    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Create unverified user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp:otp,
      otpExpiry,
      isVerified: false
    });

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      html: `Your OTP is <b>${otp}</b>. It expires in 10 minutes.`
    });

    res.status(201).json({ 
      message: "OTP sent to email", 
      data:user,
      success:true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
