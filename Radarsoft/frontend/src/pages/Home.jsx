import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchArticles } from '../redux/articleSlice'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ArticleCard from '../components/ArticleCard'
import '../styles/Home.css'

function Home() {
    const dispatch = useDispatch()
    const { articles, loading, error } = useSelector(state => state.articles)
    const [filters, setFilters] = useState({
        category: '',
        search: '',
        sortBy: 'createdAt',
        order: 'desc'
    })

    useEffect(() => {
        const params = Object.fromEntries(
            Object.entries(filters).filter(([, value]) => value)
        )
        dispatch(fetchArticles(params))
    }, [filters, dispatch])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleReset = () => {
        setFilters({
            category: '',
            search: '',
            sortBy: 'createdAt',
            order: 'desc'
        })
    }

    return (
        <Container className="py-5">
            <h1 className="mb-4">Blog Articles</h1>

            {/* Filters */}
            <Row className="mb-4 filter-section">
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Categories</option>
                            <option value="Food">Food</option>
                            <option value="Education">Education</option>
                            <option value="Businessmen">Businessmen</option>
                            <option value="Positions">Positions</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Search</Form.Label>
                        <Form.Control
                            type="text"
                            name="search"
                            placeholder="Search articles..."
                            value={filters.search}
                            onChange={handleFilterChange}
                        />
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Sort By</Form.Label>
                        <Form.Select
                            name="sortBy"
                            value={filters.sortBy}
                            onChange={handleFilterChange}
                        >
                            <option value="createdAt">Date</option>
                            <option value="title">Title</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <Form.Group>
                        <Form.Label>Order</Form.Label>
                        <Form.Select
                            name="order"
                            value={filters.order}
                            onChange={handleFilterChange}
                        >
                            <option value="desc">Newest First</option>
                            <option value="asc">Oldest First</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={2} className="d-flex align-items-end">
                    <Button variant="secondary" onClick={handleReset} className="w-100">
                        Reset
                    </Button>
                </Col>
            </Row>

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {/* Articles List */}
            {!loading && articles.length === 0 && (
                <div className="alert alert-info">
                    No articles found. Try adjusting your filters.
                </div>
            )}

            <Row>
                {articles.map(article => (
                    <Col key={article._id} md={6} lg={4} className="mb-4">
                        <ArticleCard article={article} />
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default Home
