import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";

const getAllBookings = createAsyncThunk('booking/getAll', async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/booking');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

export default getAllBookings;