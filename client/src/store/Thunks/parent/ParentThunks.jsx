import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utility/axiosInstance';

// 1. Send OTP to student email
export const sendLinkRequestThunk = createAsyncThunk(
  'parent/sendLinkRequest',
  async ({ parentId, studentEmail }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/parent/link-request', { parentId, studentEmail });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Something went wrong" });
    }
  }
);

// 2. Verify OTP and link student
export const verifyStudentOtpThunk = createAsyncThunk(
  'parent/verifyStudentOtp',
  async ({ studentEmail, otp, parentId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/parent/link-verify', { studentEmail, otp, parentId });
      return res.data;
    } catch (err) {
      console.log("OTP Verification Error:", err);
      return rejectWithValue(err.response?.data || { message: "Something went wrong" });
    }
  }
);

// 3. Get parent profile with children
export const getParentProfileThunk = createAsyncThunk(
  'parent/getParentProfile',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/parent/profile/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch parent profile" });
    }
  }
);

export const getChildrenBookingsThunk = createAsyncThunk(
  'parent/getChildrenBookings',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/parent/bookings/${id}`);
      return res.data; // Should include bookings for children
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch bookings" });
    }
  }
);

// 5. Fetch reviews for children
export const getChildrenReviewsThunk = createAsyncThunk(
  'parent/getChildrenReviews',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/parent/reviews');
      return res.data; // Should include reviews made by children
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch reviews" });
    }
  }
);

// 6. Fetch available tutors for browsing
export const getTutorsThunk = createAsyncThunk(
  'parent/getTutors',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/parent/tutors');
      return res.data; // Should include public tutor profiles
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch tutors" });
    }
  }
);
