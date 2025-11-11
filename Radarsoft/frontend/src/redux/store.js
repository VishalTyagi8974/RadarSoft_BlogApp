import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './articleSlice'
import authReducer from './authSlice'

const store = configureStore({
    reducer: {
        articles: articleReducer,
        auth: authReducer
    }
})

export default store