import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../../../../utility/axiosInstance";

const GetProfileThunk = createAsyncThunk(
  "getProfile",
  async (id, { isRejectedWithValue }) => {
    try {
      const response = await axiosInstance.get(`/profile/${id}`);
      console.log(response);
      
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);
export default GetProfileThunk;