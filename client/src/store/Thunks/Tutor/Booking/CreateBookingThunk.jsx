import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";
 const createBookingThunk = createAsyncThunk('booking/create', async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/bookings/create', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

export default createBookingThunk;