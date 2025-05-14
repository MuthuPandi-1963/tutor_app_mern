import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";

const getTutorBookings = createAsyncThunk('booking/getTutor', async (tutorId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/bookings/tutor/${tutorId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

export default getTutorBookings;