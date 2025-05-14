import {configureStore} from '@reduxjs/toolkit'
import authReducers from './Slices/AuthSlice';
import ProfileReducers from './Slices/ProfileSlice';
import SubjectReducers from './Slices/SubjectSlice';
import BookingReducers from './Slices/BookingSlice';
import ParentReducers from './Slices/ParentSlice';
const Store = configureStore({
    reducer:{
        auth : authReducers,
        profile:ProfileReducers,
        subject : SubjectReducers,
        bookings : BookingReducers,
        parent : ParentReducers,    
    }
})

export default Store;