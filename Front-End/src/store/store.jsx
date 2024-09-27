import {configureStore} from '@reduxjs/toolkit'
import  userReducer from '../store/slices/userSlice'
import adminReducer from '../store/slices/adminSlice'

const store=configureStore({
    reducer:{
        user:userReducer,
        admin:adminReducer
    }
});

export default store;