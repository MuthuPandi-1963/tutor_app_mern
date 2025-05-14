import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";

const updateBookingStatus = createAsyncThunk('booking/updateStatus', async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.put('/bookings/status', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

export default updateBookingStatus;