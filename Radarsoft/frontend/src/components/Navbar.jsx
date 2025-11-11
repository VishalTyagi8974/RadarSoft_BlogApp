import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { logout, getCurrentUser } from '../redux/authSlice'
import '../styles/Navbar.css'

function AppNavbar() {
    const dispatch = useDispatch()
    const { user, isAuthenticated, loading } = useSelector(state => state.auth)

    useEffect(() => {
        // Check if user is already logged in on mount
        if (!loading && !user && localStorage.getItem('token')) {
            dispatch(getCurrentUser())
        }
    }, [dispatch, loading, user])

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <Navbar bg="dark" expand="lg" sticky="top" className="navbar-custom">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    📝 BlogApp
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/" className="me-3">
                            Home
                        </Nav.Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/create" className="btn btn-primary btn-sm me-2">
                                    Create Article
                                </Link>
                                <div className="user-info me-3">
                                    <span className="user-name">{user?.name}</span>
                                </div>
                                <button
                                    className="btn btn-outline-light btn-sm"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline-light btn-sm me-2">
                                    Login
                                </Link>
                                <Link to="/register" className="btn btn-primary btn-sm">
                                    Register
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default AppNavbar