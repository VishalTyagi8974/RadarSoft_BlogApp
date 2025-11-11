import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getCurrentUser } from './redux/authSlice'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateArticle from './pages/CreateArticle'
import ArticleDetail from './pages/ArticleDetail'
import EditArticle from './pages/EditArticle'
import './App.css'

function App() {
    const dispatch = useDispatch()
    const { isAuthenticated, loading } = useSelector(state => state.auth)

    useEffect(() => {
        // Check if user is already logged in on app load
        dispatch(getCurrentUser())
    }, [dispatch])

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/article/:id" element={<ArticleDetail />} />

                {/* Protected Routes */}
                <Route
                    path="/create"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
                            <CreateArticle />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={loading}>
                            <EditArticle />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    )
}

export default App