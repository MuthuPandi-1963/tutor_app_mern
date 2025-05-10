import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../utility/axiosInstance'

const RegisterThunk = createAsyncThunk("register",
    async (formdata,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.post("/register",formdata)
            console.log(response);
            return response.data
            
        }catch(err){
            console.log(err);
        }
})

export default RegisterThunk;