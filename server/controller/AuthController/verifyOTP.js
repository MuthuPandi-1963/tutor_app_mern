import UserModel from '../../models/user.js';
import jwt from 'jsonwebtoken'
export const verifyOTP = async (req, res) => {
  try {
    console.log(req.body);
    
    const { email, otp } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (Date.now() > user.otpExpiry) return res.status(400).json({ message: "OTP expired" });

    // Mark as verified
    user.isVerified = true;
    user.otp = "";
    user.otpExpiry = Date.now();
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({ 
      success:true,
      message :"OTP Verified successfully " ,
      data: { _id: user._id, name: user.name, email: user.email, role: user.role, isVerified:user.isVerified } 
    });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: err.message });
  }
};