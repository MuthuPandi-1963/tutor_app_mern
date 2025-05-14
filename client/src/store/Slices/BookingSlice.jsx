import { createSlice } from '@reduxjs/toolkit';
import createBooking from '../Thunks/Tutor/Booking/CreateBookingThunk';
import getAllBookings from '../Thunks/Tutor/Booking/GetAllBooking';
import getStudentBookings from '../Thunks/Tutor/Booking/getbookingByStudent';
import getTutorBookings from '../Thunks/Tutor/Booking/getBookingStudent';
import updateBookingStatus from '../Thunks/Tutor/Booking/UpdateBookingStatus';
import updatePaymentStatus from '../Thunks/Tutor/Booking/UpdatePaymentStatus';
import deleteBooking from '../Thunks/Tutor/Booking/DeleteBooking';

const initialState = {
  bookings: [],
  isLoading: false,
  error: null,
  message: '',
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // General handler
    const handlePending = (state) => {
      state.isLoading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload || action.error.message;
    };

    builder
      // Create
      .addCase(createBooking.pending, handlePending)
      .addCase(createBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings.push(action.payload);
        state.message = "Booking created successfully";
      })
      .addCase(createBooking.rejected, handleRejected)

      // Get All
      .addCase(getAllBookings.pending, handlePending)
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, handleRejected)

      // Get Student
      .addCase(getStudentBookings.pending, handlePending)
      .addCase(getStudentBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(getStudentBookings.rejected, handleRejected)

      // Get Tutor
      .addCase(getTutorBookings.pending, handlePending)
      .addCase(getTutorBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = action.payload;
      })
      .addCase(getTutorBookings.rejected, handleRejected)

      // Update Status
      .addCase(updateBookingStatus.pending, handlePending)
      .addCase(updateBookingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedIndex = state.bookings.findIndex(b => b._id === action.payload._id);
        if (updatedIndex !== -1) state.bookings[updatedIndex] = action.payload;
      })
      .addCase(updateBookingStatus.rejected, handleRejected)

      // Update Payment
      .addCase(updatePaymentStatus.pending, handlePending)
      .addCase(updatePaymentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedIndex = state.bookings.findIndex(b => b._id === action.payload._id);
        if (updatedIndex !== -1) state.bookings[updatedIndex] = action.payload;
      })
      .addCase(updatePaymentStatus.rejected, handleRejected)

      // Delete
      .addCase(deleteBooking.pending, handlePending)
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookings = state.bookings.filter(b => b._id !== action.meta.arg);
        state.message = action.payload.message;
      })
      .addCase(deleteBooking.rejected, handleRejected);
  },
});
const BookingReducers = bookingSlice.reducer

export default BookingReducers;
