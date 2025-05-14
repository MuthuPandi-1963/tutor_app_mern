import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../../utility/axiosInstance';


const GetSubjectsThunk = createAsyncThunk ("getSubjects",
    async(id,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.get(`/subjects`)
            console.log(response);
            return response.data
        }catch(err){
            console.log(err);
            
        }
        
        
    }
)
export default GetSubjectsThunk;