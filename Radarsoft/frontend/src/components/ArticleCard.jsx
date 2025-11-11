import { Link } from 'react-router-dom'
import { Card, Badge, Button } from 'react-bootstrap'
import '../styles/ArticleCard.css'

function ArticleCard({ article }) {
    const createdDate = new Date(article.createdAt).toLocaleDateString()

    return (
        <Card className="article-card h-100 shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="primary">{article.category}</Badge>
                    <small className="text-muted">{createdDate}</small>
                </div>

                <Card.Title className="article-title">
                    {article.title}
                </Card.Title>

                <Card.Text className="article-description text-muted">
                    {article.description}
                </Card.Text>

                <div className="article-author mb-3">
                    <small className="text-secondary">By {article.author}</small>
                </div>

                <Link to={`/article/${article._id}`} className="btn btn-primary btn-sm">
                    Read More
                </Link>
            </Card.Body>
        </Card>
    )
}

export default ArticleCard
