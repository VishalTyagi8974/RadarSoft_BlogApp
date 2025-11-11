import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../api/axiosConfig'

// Async Thunks
export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData)
            // Store token in localStorage
            localStorage.setItem('token', response.data.token)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed')
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/auth/login', userData)
            // Store token in localStorage
            localStorage.setItem('token', response.data.token)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Login failed')
        }
    }
)

export const getCurrentUser = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                return null
            }

            const response = await axiosInstance.get('/auth/me')
            return response.data.user
        } catch (error) {
            localStorage.removeItem('token')
            return rejectWithValue(error.response?.data?.message || 'Failed to get user')
        }
    }
)

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token')
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.isAuthenticated = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // Get Current User
            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.user = action.payload
                    state.isAuthenticated = true
                }
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.loading = false
                state.isAuthenticated = false
            })
    }
})

export const { clearError, logout } = authSlice.actions
export default authSlice.reducer
