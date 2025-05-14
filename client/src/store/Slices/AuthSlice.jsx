import { createSlice } from "@reduxjs/toolkit";
import RegisterThunk from "../Thunks/Auth/RegisterThunk";
import VerifyOTPThunk from "../Thunks/Auth/VerifyOTPThunk";
import LoginThunk from "../Thunks/Auth/LoginThunk";
import RefreshAuthThunk from "../Thunks/Auth/RefreshAuthThunk";
import LogoutThunk from "../Thunks/Auth/LogoutThunk";

const initialState = {
  success: false,
  isLoading: false,
  isAuthenticated: false,
  message: "",
  data: {},
};
const dummyData = {
  success: false,
  message: "",
  data: {},
};
const HandleEvent = (state, action) => {
  const { success, message, data } = action.payload || dummyData;
  state.data = data || {};
  (state.isAuthenticated = data.isVerified),
    (state.message = message),
    (state.success = success);
};
const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(RegisterThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(RegisterThunk.fulfilled, HandleEvent);
    builder.addCase(RegisterThunk.rejected, HandleEvent);

    builder.addCase(VerifyOTPThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(VerifyOTPThunk.fulfilled, HandleEvent);
    builder.addCase(VerifyOTPThunk.rejected, HandleEvent);

    builder.addCase(LoginThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(LoginThunk.fulfilled, HandleEvent);
    builder.addCase(LoginThunk.rejected, HandleEvent);

    builder.addCase(RefreshAuthThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(RefreshAuthThunk.fulfilled, HandleEvent);
    builder.addCase(RefreshAuthThunk.rejected, HandleEvent);

    builder.addCase(LogoutThunk.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(LogoutThunk.fulfilled, (state, action) => {
      state.data = {};
      state.isAuthenticated = false;
      state.success = false;
      state.message = "Logged out successfully";
    });

    builder.addCase(LogoutThunk.rejected, (state, action) => {});
  },
});
const authReducers = AuthSlice.reducer;
export default authReducers;
