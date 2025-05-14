import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../../utility/axiosInstance'

const LogoutThunk = createAsyncThunk("logout",
    async()=>{
        try{
        const response = await axiosInstance.get("/logout")
        return response.data
        }
        catch(err){
            console.log(err);
            
        }

        
    }
)
export default LogoutThunk;