import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";

const deleteBooking = createAsyncThunk('booking/delete', async (bookingId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/booking/${bookingId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

export default deleteBooking;