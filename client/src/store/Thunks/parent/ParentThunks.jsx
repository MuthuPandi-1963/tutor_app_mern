import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utility/axiosInstance';

// 1. Send OTP to student email
export const sendLinkRequestThunk = createAsyncThunk(
  'parent/sendLinkRequest',
  async ({ parentId, studentEmail }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/api/parent/link-request', { parentId, studentEmail });
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
      const res = await axios.post('/api/parent/link-verify', { studentEmail, otp, parentId });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Something went wrong" });
    }
  }
);

// 3. Get all children for a parent
export const getChildrenThunk = createAsyncThunk(
  'parent/getChildren',
  async (parentId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/parent/children/${parentId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Something went wrong" });
    }
  }
);
