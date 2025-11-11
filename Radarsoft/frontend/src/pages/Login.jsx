import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login, clearError } from '../redux/authSlice'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import '../styles/AuthForm.css'

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, isAuthenticated } = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const errors = {}

        if (!formData.email.trim()) {
            errors.email = 'Email is required'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = 'Please enter a valid email'
        }

        if (!formData.password) {
            errors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters'
        }

        setValidationErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            const result = await dispatch(login(formData))
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/')
            }
        } catch (err) {
            console.error('Error logging in:', err)
        }
    }

    return (
        <Container className="py-5">
            <div className="auth-container">
                <h1 className="mb-4 text-center">Login</h1>

                {error && (
                    <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            isInvalid={!!validationErrors.email}
                        />
                        {validationErrors.email && (
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.email}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            isInvalid={!!validationErrors.password}
                        />
                        {validationErrors.password && (
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.password}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>

                <div className="text-center">
                    <p>
                        Don't have an account?{' '}
                        <Link to="/register" className="link-primary">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </Container>
    )
}

export default Login
