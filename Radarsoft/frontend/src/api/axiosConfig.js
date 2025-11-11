import axios from 'axios'

// Use environment variable if available, otherwise default to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

// Create axios instance
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    withCredentials: true
})

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // If token is invalid or expired, clear it and redirect to login
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            // You could dispatch an action here to clear auth state
            // For now, the app will automatically redirect via ProtectedRoute
        }
        return Promise.reject(error)
    }
)

export default axiosInstance
export { API_BASE_URL }
