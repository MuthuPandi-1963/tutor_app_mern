import { createSlice } from '@reduxjs/toolkit'
import GetSubjectsThunk from '../Thunks/subjects/GetSubjectsThunk';

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

const SubjectSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetSubjectsThunk.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(GetSubjectsThunk.fulfilled, HandleEvent);
        builder.addCase(GetSubjectsThunk.rejected, HandleEvent);
    }
});

const SubjectReducers = SubjectSlice.reducer;
export default SubjectReducers;
