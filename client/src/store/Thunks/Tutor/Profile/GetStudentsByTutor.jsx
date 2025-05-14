import {createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
import axiosInstance from '../../../../utility/axiosInstance';

const GetStudentsByTutor = createAsyncThunk("getStudents",
    async(id,{isRejectedWithValue})=>{
        try {
            const  response = await axiosInstance.get(`/${id}/students`)
            return response.data;
        } catch (error) {
            console.log(error);
            
        }
    }
)
export default GetStudentsByTutor;