import UserModel from '../models/user.js';
import { transporter } from '../utils/nodemailer.js';
import BookingModel from '../models/booking.js';

// 1. Parent requests to link student
export const requestStudentLink = async (req, res) => {
  try {
    console.log(req.body)
    const { parentId, studentEmail } = req.body;

    // Find student
    const student = await UserModel.findOne({ email: studentEmail, role: 'student' });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // Find parent
    const parent = await UserModel.findById(parentId);
    if (!parent) return res.status(404).json({ message: "Parent not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    student.otp = otp;
    student.otpExpiry = otpExpiry;
    await student.save();

    // Compose better message
    const message = `
      <p>Hi ${student.name},</p>
      <p><b>${parent.name}</b> (email: ${parent.email}) is requesting to link you as their child in our TutorApp platform.</p>
      <p>Please verify this request using the following OTP:</p>
      <h2>${otp}</h2>
      <p>This OTP is valid for <b>5 minutes</b>.</p>
      <p>If you did not expect this, you can ignore this message.</p>
      <br/>
      <p>Thank you,</p>
      <p><b>TutorApp Team</b></p>
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: studentEmail,
      subject: "Parent Link Request - TutorApp",
      html: message
    });

    console.log(`OTP for linking: ${otp}`); // dev mode
    res.status(200).json({success:true, message: "OTP sent to student email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


// 2. Student verifies OTP and links with parent
export const verifyStudentOTP = async (req, res) => {
  try {
    console.log(req.body);
    
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

    res.status(200).json({ success:true,message: "Student linked to parent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getParentProfile = async (req, res) => {
  try {
    const parentId = req.params.id // assuming JWT middleware sets this

    const parent = await UserModel.findById(parentId)
      .select('-password') // exclude sensitive info
      .populate('children', 'name email profileUrl'); // include basic child info

    if (!parent || parent.role !== 'parent') {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(parent);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getChildrenBookings = async (req, res) => {
  try {
    const parentId = req.params.id

    const parent = await UserModel.findById(parentId).populate("children");

    if (!parent || parent.role !== 'parent') {
      return res.status(403).json({ message: "Not authorized" });
    }

    const childIds = parent.children.map(child => child._id);

    const bookings = await BookingModel.find({ student: { $in: childIds } })
      .populate('student', 'name email')
      .populate('tutor', 'name profileUrl')
      .populate('subject', 'name')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

export const getChildrenReviews = async (req, res) => {
  try {
    const parentId = req.params.id

    const parent = await UserModel.findById(parentId).populate("children");

    if (!parent || parent.role !== 'parent') {
      return res.status(403).json({ message: "Not authorized" });
    }

    const childIds = parent.children.map(child => child._id);

    const reviews = await ReviewModel.find({ student: { $in: childIds } })
      .populate('tutor', 'name profileUrl')
      .populate('student', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews", error: err.message });
  }
};
export const getPublicTutors = async (req, res) => {
  try {
    const tutors = await UserModel.find({ role: "tutor" })
      .select("name bio qualifications subjects hourlyRate availability rating profileUrl")
      .populate("subjects", "name");

    res.json(tutors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tutors", error: err.message });
  }
};
