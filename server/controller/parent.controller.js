
import nodemailer from 'nodemailer'; // or use any mail service you prefer
import crypto from 'crypto';
import UserModel from '../models/user.js';
import { transporter } from '../utils/nodemailer.js';

// 1. Parent requests to link student
export const requestStudentLink = async (req, res) => {
  try {
    const { parentId, studentEmail } = req.body;
    const student = await UserModel.findOne({ email: studentEmail, role: 'student' });
    
    if (!student) return res.status(404).json({ message: "Student not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    student.otp = otp;
    student.otpExpiry = otpExpiry;
    await student.save();

    await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: studentEmail,
          subject: "Verify Your Email",
          html: `Your OTP is <b>${otp}</b>. It expires in 10 minutes.`
        });
    console.log(`OTP for linking: ${otp}`); // dev mode
    res.status(200).json({ message: "OTP sent to student email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Student verifies OTP and links with parent
export const verifyStudentOTP = async (req, res) => {
  try {
    const { studentEmail, otp, parentId } = req.body;
    const student = await UserModel.findOne({ email: studentEmail, role: 'student' });

    if (!student || student.otp !== otp || student.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    student.parent = parentId;
    student.otp = "";
    student.otpExpiry = null;
    await student.save();

    // Add student to parent's children[]
    await UserModel.findByIdAndUpdate(parentId, {
      $addToSet: { children: student._id }
    });

    res.status(200).json({ message: "Student linked to parent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Parent fetches all children activities
export const getChildrenActivities = async (req, res) => {
  try {
    const { parentId } = req.params;

    const parent = await UserModel.findById(parentId).populate({
      path: 'children',
      populate: {
        path: 'subjects',
        model: 'subject'
      }
    });

    if (!parent || parent.role !== 'parent') {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({ children: parent.children });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
