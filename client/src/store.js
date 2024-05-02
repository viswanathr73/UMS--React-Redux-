import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import { apiSclice } from './slices/apiSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        [apiSclice.reducerPath]:apiSclice.reducer 
    },
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(apiSclice.middleware),
    devTools:true
})

export default store