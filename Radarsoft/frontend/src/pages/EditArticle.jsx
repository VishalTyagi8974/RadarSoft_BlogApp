import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchArticleById, updateArticle, clearError } from '../redux/articleSlice'
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap'
import '../styles/ArticleForm.css'

function EditArticle() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentArticle, loading, error } = useSelector(state => state.articles)
    const { user, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [id, dispatch])

    // Check if user is owner
    useEffect(() => {
        if (currentArticle && isAuthenticated && user) {
            if (currentArticle.userId._id !== user.id) {
                navigate(`/article/${id}`)
            }
        }
    }, [currentArticle, isAuthenticated, user, id, navigate])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        author: '',
        content: ''
    })

    const [validationErrors, setValidationErrors] = useState({})

    useEffect(() => {
        if (currentArticle) {
            setFormData({
                title: currentArticle.title,
                description: currentArticle.description,
                category: currentArticle.category,
                author: currentArticle.author,
                content: currentArticle.content
            })
        }
    }, [currentArticle])

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

        if (!formData.title.trim()) {
            errors.title = 'Title is required'
        } else if (formData.title.length > 200) {
            errors.title = 'Title cannot exceed 200 characters'
        }

        if (!formData.description.trim()) {
            errors.description = 'Description is required'
        } else if (formData.description.length < 10) {
            errors.description = 'Description must be at least 10 characters'
        }

        if (!formData.category) {
            errors.category = 'Category is required'
        }

        if (!formData.content.trim()) {
            errors.content = 'Content is required'
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
            const result = await dispatch(updateArticle({ id, data: formData }))
            if (result.meta.requestStatus === 'fulfilled') {
                navigate(`/article/${id}`)
            }
        } catch (err) {
            console.error('Error updating article:', err)
        }
    }

    if (loading && !currentArticle) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <Container className="py-5">
            <div className="form-container">
                <h1 className="mb-4">Edit Article</h1>

                {error && (
                    <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
                        {error}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter article title"
                            isInvalid={!!validationErrors.title}
                        />
                        {validationErrors.title && (
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.title}
                            </Form.Control.Feedback>
                        )}
                        <small className="text-muted">
                            {formData.title.length}/200 characters
                        </small>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            rows={2}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description of the article"
                            isInvalid={!!validationErrors.description}
                        />
                        {validationErrors.description && (
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.description}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            isInvalid={!!validationErrors.category}
                        >
                            <option value="">Select a category</option>
                            <option value="Food">Food</option>
                            <option value="Education">Education</option>
                            <option value="Businessmen">Businessmen</option>
                            <option value="Positions">Positions</option>
                        </Form.Select>
                        {validationErrors.category && (
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.category}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            value={formData.author}
                            disabled
                            placeholder="Author name"
                        />
                        <small className="text-muted">
                            Article author cannot be changed
                        </small>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="content"
                            rows={8}
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Full article content"
                            isInvalid={!!validationErrors.content}
                        />
                        {validationErrors.content && (
                            <Form.Control.Feedback type="invalid">
                                {validationErrors.content}
                            </Form.Control.Feedback>
                        )}
                    </Form.Group>

                    <div className="d-flex gap-2">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Article'}
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => navigate(`/article/${id}`)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        </Container>
    )
}

export default EditArticle
