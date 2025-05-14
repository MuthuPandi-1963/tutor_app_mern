import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../../utility/axiosInstance'

const LoginThunk = createAsyncThunk("login",
    async (formdata,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.post("/login",formdata)
            console.log(response);
            return response.data
            
        }catch(err){
            console.log(err);
        }
})

export default LoginThunk;