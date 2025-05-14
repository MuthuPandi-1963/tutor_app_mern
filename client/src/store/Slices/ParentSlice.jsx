import { createSlice } from '@reduxjs/toolkit';
import {
  sendLinkRequestThunk,
  verifyStudentOtpThunk,
  getParentProfileThunk,
  getChildrenBookingsThunk,
  getChildrenReviewsThunk,
  getTutorsThunk
} from '../Thunks/parent/ParentThunks';

const initialState = {
  isLoading: false,
  success: false,
  message: '',
  profile: null,
  children: [],
  bookings: [],
  reviews: [],
  tutors: [],
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

    // Get Parent Profile
    builder.addCase(getParentProfileThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getParentProfileThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.profile = action.payload.parent;
      state.children = action.payload.children;
    });
    builder.addCase(getParentProfileThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.message = action.payload.message;
    });

    // Get Bookings
    builder.addCase(getChildrenBookingsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChildrenBookingsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.bookings = action.payload.bookings;
    });
    builder.addCase(getChildrenBookingsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });

    // Get Reviews
    builder.addCase(getChildrenReviewsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getChildrenReviewsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.reviews = action.payload.reviews;
    });
    builder.addCase(getChildrenReviewsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });

    // Get Tutors
    builder.addCase(getTutorsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTutorsThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tutors = action.payload.tutors;
    });
    builder.addCase(getTutorsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.message = action.payload.message;
    });
  },
});

export const { clearParentState } = parentSlice.actions;
const ParentReducers = parentSlice.reducer;
export default ParentReducers;
