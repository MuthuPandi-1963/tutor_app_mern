import { createSlice } from '@reduxjs/toolkit';
import { sendLinkRequestThunk, verifyStudentOtpThunk, getChildrenThunk } from '../Thunks/parent/ParentThunks';

const initialState = {
  isLoading: false,
  success: false,
  message: '',
  children: [],
};

const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    clearParentState: (state) => {
      state.success = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    // Send Link Request
    builder.addCase(sendLinkRequestThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(sendLinkRequestThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(sendLinkRequestThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.message = action.payload.message;
    });

    // Verify OTP
    builder.addCase(verifyStudentOtpThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(verifyStudentOtpThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.message = action.payload.message;
    });
    builder.addCase(verifyStudentOtpThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.message = action.payload.message;
    });

    // Get Children
    builder.addCase(getChildrenThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChildrenThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.children = action.payload.children;
    });
    builder.addCase(getChildrenThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });
  }
});

export const { clearParentState } = parentSlice.actions;
const ParentReducers =parentSlice.reducer
export default ParentReducers;
