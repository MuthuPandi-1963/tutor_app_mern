import { createSlice } from '@reduxjs/toolkit'
import GetProfileThunk from '../Thunks/Tutor/Profile/GetProfileThunk'
import GetAllTutorsThunk from '../Thunks/Tutor/Profile/GetAllTutorsThunk';
import UpdateTutorProfileThunk from '../Thunks/Tutor/Profile/UpdateTutorProfileThunk';
import GetStudentsByTutor from '../Thunks/Tutor/Profile/GetStudentsByTutor';

const initialState = {
    data: {},
    success: false,
    message: "",
    isLoading: false
}

const HandleEvent = (state, action) => {
    console.log(action.payload);

    const { success, message, data } = action.payload || {};

    state.success = success || false;
    state.message = message || "";
    state.data = data || {};
    state.isLoading = false;
}

const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetProfileThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetProfileThunk.fulfilled, HandleEvent);
        builder.addCase(GetProfileThunk.rejected, HandleEvent);

        builder.addCase(GetAllTutorsThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetAllTutorsThunk.fulfilled, HandleEvent);
        builder.addCase(GetAllTutorsThunk.rejected, HandleEvent);

        builder.addCase(UpdateTutorProfileThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(UpdateTutorProfileThunk.fulfilled, HandleEvent);
        builder.addCase(UpdateTutorProfileThunk.rejected, HandleEvent);
        builder.addCase(GetStudentsByTutor.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetStudentsByTutor.fulfilled, HandleEvent);
        builder.addCase(GetStudentsByTutor.rejected, HandleEvent);
    }   

});

const ProfileReducers = ProfileSlice.reducer;
export default ProfileReducers;
