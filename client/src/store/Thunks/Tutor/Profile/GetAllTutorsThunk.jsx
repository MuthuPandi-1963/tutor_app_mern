import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";

const GetAllTutorsThunk = createAsyncThunk(
  "getAllTutors",
  async (id, { isRejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/get_all_tutors`);
      console.log(response);
      
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export default GetAllTutorsThunk;