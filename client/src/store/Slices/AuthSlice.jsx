import { createSlice } from '@reduxjs/toolkit'
import RegisterThunk from '../Thunks/RegisterThunk'
import VerifyOTPThunk from '../Thunks/VerifyOTPThunk'
import LoginThunk from '../Thunks/LoginThunk'

const initialState = {
    success: false,
    isLoading : false,
    isAuthenticated: false,
    message: "",
    data: {},
}
const HandleEvent = (state, action) => {
    const { success, message, data } = action.payload
    state.data = data || {}
    state.isAuthenticated = data.isVerified,
    state.message = message,
    state.success = success
}
const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(RegisterThunk.pending, (state, action) =>{state.isLoading=true})
        builder.addCase(RegisterThunk.fulfilled, HandleEvent)
        builder.addCase(RegisterThunk.rejected, HandleEvent)

        builder.addCase(VerifyOTPThunk.pending, (state, action) =>{state.isLoading=true})
        builder.addCase(VerifyOTPThunk.fulfilled, HandleEvent)
        builder.addCase(VerifyOTPThunk.rejected, HandleEvent)

        builder.addCase(LoginThunk.pending, (state, action) =>{state.isLoading=true})
        builder.addCase(LoginThunk.fulfilled, HandleEvent)
        builder.addCase(LoginThunk.rejected, HandleEvent)
    }
})
const authReducers =AuthSlice.reducer
export default authReducers