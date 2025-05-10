import UserModel from "../../models/user.js";
import { generateOTP } from "../../utils/genOTP.js";
import { transporter } from "../../utils/nodemailer.js";

export const resendOTP = async (req, res) => {
    try {
        console.log(req.body);
        
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user) return res.status(404).json({ message: "User not found" });
        
      // Generate new OTP
      const otp = generateOTP();
      const otpExpiry = Date.now() + 10 * 60 * 1000;
  
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
  
      // Resend email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "New OTP",
        html: `Your new OTP is <b>${otp}</b>. It expires in 10 minutes.`
      });
  
      res.json({ message: "New OTP sent" });
    } catch (err) {
        console.log(err);
        
      res.status(500).json({ message: err.message });
    }
  };    