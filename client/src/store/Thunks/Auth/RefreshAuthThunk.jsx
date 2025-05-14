import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../../utility/axiosInstance'

const RefreshAuthThunk = createAsyncThunk("refreshAuth",
    async (_,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.get("/refresh_auth")
            console.log(response);
            return response.data
            
        }catch(err){
            console.log(err);
        }
})

export default RefreshAuthThunk;