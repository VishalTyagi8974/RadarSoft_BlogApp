const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a title'],
            trim: true,
            maxlength: [200, 'Title cannot exceed 200 characters']
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
            minlength: [10, 'Description must be at least 10 characters']
        },
        category: {
            type: String,
            enum: ['Food', 'Education', 'Businessmen', 'Positions'],
            required: [true, 'Please select a category']
        },
        author: {
            type: String,
            required: [true, 'Please provide author name'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Please provide article content']
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Article must belong to a user']
        }
    },
    {
        timestamps: true
    }
); module.exports = mongoose.model('Article', articleSchema);
