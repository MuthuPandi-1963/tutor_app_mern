import {configureStore} from '@reduxjs/toolkit'
import authReducers from './Slices/AuthSlice';
const Store = configureStore({
    reducer:{
        auth : authReducers
    }
})

export default Store;