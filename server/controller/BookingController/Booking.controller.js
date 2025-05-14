// Assuming a user model exists

import BookingModel from "../../models/booking.js";
import UserModel from "../../models/user.js";

// Create a new booking
import SubjectModel from "../../models/subject.js"; // Add this import if not already
import { transporter } from "../../utils/nodemailer.js";

export const createBooking = async (req, res) => {
  try {
    const { student, tutor, dateTime, duration, subject } = req.body;
    console.log(req.body);

    // Validate student, tutor, and subject
    const [studentExists, tutorExists, subjectExists] = await Promise.all([
      UserModel.findById(student),
      UserModel.findById(tutor),
      SubjectModel.findById(subject),
    ]);

    if (!studentExists || !tutorExists || !subjectExists) {
      return res
        .status(404)
        .json({ message: "Student, Tutor, or Subject not found" });
    }

    const newBooking = new BookingModel({
      student,
      tutor,
      dateTime,
      duration,
      subject,
      status: "pending",
    });

    const savedBooking = await newBooking.save();
    return res.status(201).json(savedBooking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("student tutor", "name email")
      .populate("subject", "name"); // Populate subject name
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for a specific student
export const getStudentBookings = async (req, res) => {
  try {
    const { studentId } = req.params;
    const bookings = await BookingModel.find({ student: studentId })
      .populate("tutor", "name email")
      .populate("subject", "name");
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for a specific tutor
export const getTutorBookings = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const bookings = await BookingModel.find({ tutor: tutorId })
      .populate("student", "name email")
      .populate("subject", "name");
    return res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    console.log(req.body);

    const validStatuses = ["pending", "accepted", "declined", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const studentDetail = await UserModel.findById(updatedBooking.student);
    const tutorDetail = await UserModel.findById(updatedBooking.tutor);
    const subjectDetail = await SubjectModel.findById(updatedBooking.subject);

    if (!studentDetail || !tutorDetail || !subjectDetail) {
      return res.status(400).json({ message: "Invalid tutor, student, or subject" });
    }

    const scheduledDate = new Date(updatedBooking.dateTime);
    const startHour = scheduledDate.getHours();
    const endHour = startHour + updatedBooking.duration;

    const formattedStart = `${startHour.toString().padStart(2, '0')}:00`;
    const formattedEnd = `${endHour.toString().padStart(2, '0')}:00`;

    let emailHtml = `
      <ul>
        <li><strong>Subject:</strong> ${subjectDetail.name}</li>
        <li><strong>Scheduled Date:</strong> ${scheduledDate.toLocaleDateString()}</li>
        <li><strong>Scheduled Duration:</strong> ${updatedBooking.duration} hour(s)</li>
        <li><strong>Scheduled Timing:</strong> ${formattedStart} - ${formattedEnd}</li>
        <li><strong>Status:</strong> ${status.charAt(0).toUpperCase() + status.slice(1)}</li>
      </ul>
    `;

    if (status === "accepted") {
      const googleLink = `https://meet.google.com/ixt-tjnh-xyq`; // Ideally dynamically generated
      emailHtml += `<p><strong>Google Meet Link:</strong> <a href="${googleLink}">${googleLink}</a></p>`;
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: studentDetail.email,
      subject: `Booking ${status.charAt(0).toUpperCase() + status.slice(1)} by ${tutorDetail.name}`,
      html: `
        <p>Dear ${studentDetail.name},</p>
        <p>Your booking request has been <strong>${status}</strong> by <strong>${tutorDetail.name}</strong>.</p>
        <p>Here are the details of your booking:</p>
        ${emailHtml}
        <p>Please ensure you’re available at the scheduled time.</p>
        <p>If you have questions, contact your tutor or our support team.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>TutorApp Team</strong></p>
      `,
    });

    return res.status(200).json(updatedBooking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { bookingId, paymentStatus } = req.body;

    const updatedBooking = await BookingModel.findByIdAndUpdate(
      bookingId,
      { paymentStatus },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json(updatedBooking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const deletedBooking = await BookingModel.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
