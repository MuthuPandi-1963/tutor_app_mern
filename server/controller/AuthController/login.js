import UserModel from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) 
      return res.status(404).json({ message: "User not found" });

    // 2) Check if email is verified
    if (!user.isVerified) 
      return res.status(403).json({ message: "Please verify your email before logging in" });

    // 3) Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
      return res.status(401).json({ message: "Invalid credentials" });

    // 4) Generate JWT
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

    // 5) Send response
    res.json({
      success:true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified : user.isVerified
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
