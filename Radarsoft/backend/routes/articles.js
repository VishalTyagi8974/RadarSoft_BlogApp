const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const auth = require('../middleware/auth');

// GET all articles with optional filtering and sorting (public)
router.get('/', async (req, res) => {
    try {
        const { category, sortBy = 'createdAt', order = 'desc', search } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const sortOrder = order === 'asc' ? 1 : -1;
        const articles = await Article.find(filter)
            .populate('userId', 'name email')
            .sort({ [sortBy]: sortOrder });

        res.status(200).json({
            success: true,
            count: articles.length,
            data: articles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET single article (public)
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
            .populate('userId', 'name email');

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        res.status(200).json({
            success: true,
            data: article
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// CREATE new article (requires authentication)
router.post('/', auth, async (req, res) => {
    try {
        const { title, description, category, author, content } = req.body;

        const article = await Article.create({
            title,
            description,
            category,
            author,
            content,
            userId: req.userId
        });

        res.status(201).json({
            success: true,
            message: 'Article created successfully',
            data: article
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// UPDATE article (requires authentication and ownership)
router.put('/:id', auth, async (req, res) => {
    try {
        let article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        // Check if user owns the article
        if (article.userId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this article'
            });
        }

        article = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: 'Article updated successfully',
            data: article
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// DELETE article (requires authentication and ownership)
router.delete('/:id', auth, async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }

        // Check if user owns the article
        if (article.userId.toString() !== req.userId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this article'
            });
        }

        await Article.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Article deleted successfully',
            data: article
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;