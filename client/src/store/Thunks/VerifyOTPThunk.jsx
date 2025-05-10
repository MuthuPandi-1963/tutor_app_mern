import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../utility/axiosInstance'

const VerifyOTPThunk = createAsyncThunk("verify_otp",
    async (formdata,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.post("/verify_otp",formdata)
            console.log(response);
            return response.data
            
        }catch(err){
            console.log(err);
        }
})

export default VerifyOTPThunk;