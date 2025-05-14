import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";

const updatePaymentStatus = createAsyncThunk('booking/updatePayment', async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.put('/booking/payment', data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

export default updatePaymentStatus; 