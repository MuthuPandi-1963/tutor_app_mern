import BookingModel from '../../models/booking.js';
import UserModel from '../../models/user.js';

// Helper: Convert time string "HH:MM" to minutes
const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

// Create new booking (Student)
export const createBooking = async (req, res) => {
  try {
    const { tutorId, dateTime, duration } = req.body;
    const studentId = req.user.id;

    // 1. Validate inputs
    const bookingDate = new Date(dateTime);
    if (bookingDate < new Date()) {
      return res.status(400).json({ message: "Cannot book past dates" });
    }

    // 2. Get tutor and student
    const tutor = await UserModel.findById(tutorId);
    const student = await UserModel.findById(studentId);
    
    if (!tutor || tutor.role !== 'tutor') {
      return res.status(404).json({ message: "Tutor not found" });
    }

    // 3. Check tutor availability
    const bookingDay = bookingDate.toLocaleDateString('en-US', { weekday: 'long' });
    const availability = tutor.availability.find(a => a.day === bookingDay);
    
    if (!availability) {
      return res.status(400).json({ message: "Tutor not available on this day" });
    }

    // 4. Convert times to minutes
    const bookingStart = timeToMinutes(
      bookingDate.toLocaleTimeString('en-US', { hour12: false }).slice(0,5)
    );
    const bookingEnd = bookingStart + duration;
    
    const availableStart = timeToMinutes(availability.startTime);
    const availableEnd = timeToMinutes(availability.endTime);

    if (bookingStart < availableStart || bookingEnd > availableEnd) {
      return res.status(400).json({ message: "Time slot not available" });
    }

    // 5. Check for overlapping bookings
    const existing = await BookingModel.findOne({
      tutor: tutorId,
      dateTime: { 
        $lt: new Date(bookingDate.getTime() + duration * 60000)
      },
      $expr: {
        $gt: [
          { $add: ["$dateTime", { $multiply: ["$duration", 60000] }] },
          bookingDate
        ]
      }
    });

    if (existing) {
      return res.status(409).json({ message: "Time slot already booked" });
    }

    // 6. Create booking
    const booking = await BookingModel.create({
      student: studentId,
      tutor: tutorId,
      dateTime: bookingDate,
      duration,
      status: 'pending'
    });

    res.status(201).json(booking);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
