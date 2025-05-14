import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";

const getStudentBookings = createAsyncThunk('booking/getStudent', async (studentId) => {
    try {
      const response = await axiosInstance.get(`/bookings/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      
      // return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  });

  export default getStudentBookings;