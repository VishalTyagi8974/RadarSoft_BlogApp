import { Navigate } from 'react-router-dom'
import { Spinner, Container } from 'react-bootstrap'

const ProtectedRoute = ({ children, isAuthenticated, isLoading }) => {
    if (isLoading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
