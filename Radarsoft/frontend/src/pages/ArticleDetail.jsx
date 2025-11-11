import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchArticleById, deleteArticle } from '../redux/articleSlice'
import { Container, Button, Badge, Spinner } from 'react-bootstrap'
import '../styles/ArticleDetail.css'

function ArticleDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentArticle, loading, error } = useSelector(state => state.articles)
    const { user, isAuthenticated } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [id, dispatch])

    const isOwner = isAuthenticated && user && currentArticle?.userId?._id === user.id

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            const result = await dispatch(deleteArticle(id))
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/')
            }
        }
    }

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        )
    }

    if (error) {
        return (
            <Container className="py-5">
                <div className="alert alert-danger">{error}</div>
                <Button variant="secondary" onClick={() => navigate('/')}>
                    Back to Articles
                </Button>
            </Container>
        )
    }

    if (!currentArticle) {
        return (
            <Container className="py-5">
                <div className="alert alert-info">Article not found</div>
                <Button variant="secondary" onClick={() => navigate('/')}>
                    Back to Articles
                </Button>
            </Container>
        )
    }

    const createdDate = new Date(currentArticle.createdAt).toLocaleDateString()
    const updatedDate = new Date(currentArticle.updatedAt).toLocaleDateString()

    return (
        <Container className="py-5">
            <article className="article-detail">
                <div className="article-header">
                    <div>
                        <h1>{currentArticle.title}</h1>
                        <div className="article-meta">
                            <span className="author">By {currentArticle.author}</span>
                            <span className="date">Published: {createdDate}</span>
                            {currentArticle.updatedAt !== currentArticle.createdAt && (
                                <span className="date">Updated: {updatedDate}</span>
                            )}
                            <Badge bg="primary">{currentArticle.category}</Badge>
                        </div>
                    </div>
                </div>

                <div className="article-description">
                    <p className="lead">{currentArticle.description}</p>
                </div>

                <div className="article-content">
                    <p>{currentArticle.content}</p>
                </div>

                <div className="article-actions">
                    {isOwner ? (
                        <>
                            <Button
                                variant="primary"
                                onClick={() => navigate(`/edit/${currentArticle._id}`)}
                                className="me-2"
                            >
                                Edit Article
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleDelete}
                                className="me-2"
                            >
                                Delete Article
                            </Button>
                        </>
                    ) : null}
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/')}
                    >
                        Back to Articles
                    </Button>
                </div>
            </article>
        </Container>
    )
}

export default ArticleDetail
