import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../../../utility/axiosInstance'


const UpdateTutorProfileThunk = createAsyncThunk ("createTutorProfile",
    async(formdata,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.put(`/profile/${formdata.id}`,formdata)
            console.log(response);
            return response.data
        }catch(err){
            console.log(err);
            
        }
        
        
    }
)
export default UpdateTutorProfileThunk;