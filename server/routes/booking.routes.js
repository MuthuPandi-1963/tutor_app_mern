import express from 'express';
import {
  createBooking,
  getAllBookings,
  getStudentBookings,
  getTutorBookings,
  updateBookingStatus,
  updatePaymentStatus,
  deleteBooking
} from '../controller/BookingController/Booking.controller.js';

const BookingRoutes = express.Router();

// Route to create a new booking
BookingRoutes.post('/create', createBooking);

// Route to get all bookings
BookingRoutes.get('/', getAllBookings);

// Route to get bookings by student
BookingRoutes.get('/student/:studentId', getStudentBookings);

// Route to get bookings by tutor
BookingRoutes.get('/tutor/:tutorId', getTutorBookings);

// Route to update booking status
BookingRoutes.put('/status', updateBookingStatus);

// Route to update payment status
BookingRoutes.put('/payment', updatePaymentStatus);

// Route to delete a booking
BookingRoutes.delete('/:bookingId', deleteBooking);

export default BookingRoutes;
