# Blog Application - MERN Stack

A full-stack blog application built with **M**ongoDB, **E**xpress, **R**eact (with Vite), and **N**ode.js. Features Redux Toolkit for state management and Bootstrap for styling.

## 📁 Project Structure

```
Radarsoft/
├── backend/
│   ├── models/
│   │   └── Article.js
│   ├── routes/
│   │   └── articles.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ArticleCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── CreateArticle.jsx
    │   │   ├── ArticleDetail.jsx
    │   │   └── EditArticle.jsx
    │   ├── redux/
    │   │   ├── articleSlice.js
    │   │   └── store.js
    │   ├── styles/
    │   │   ├── Navbar.css
    │   │   ├── ArticleCard.css
    │   │   ├── ArticleForm.css
    │   │   ├── ArticleDetail.css
    │   │   └── Home.css
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your MongoDB connection string and other settings:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blog
   JWT_SECRET=your_secret_key_here
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:3000`

## ✨ Features

### Article Management
- ✅ **Create Articles** - Add new blog posts with title, description, category, author, and content
- ✅ **Read Articles** - View all articles with detailed view
- ✅ **Update Articles** - Edit existing articles
- ✅ **Delete Articles** - Remove articles from the database

### Filtering & Search
- 🔍 **Search** - Search articles by title or description
- 📁 **Filter by Category** - Available categories: Food, Education, Businessmen, Positions
- 📅 **Sort by Date** - View newest or oldest articles first
- 📝 **Sort by Title** - Alphabetical sorting

### User Interface
- 🎨 **Bootstrap Styling** - Modern, responsive design
- 📱 **Responsive Layout** - Works on desktop, tablet, and mobile
- 🎯 **Intuitive Navigation** - Easy-to-use navigation bar
- 💫 **Smooth Animations** - Hover effects and transitions

## 🛠️ Technology Stack

### Backend
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Nodemon** - Development server with auto-reload

### Frontend
- **React 18** - UI library with hooks
- **Vite** - Fast build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Bootstrap 5** - CSS framework
- **React Bootstrap** - Bootstrap components for React
- **Axios** - HTTP client for API calls

## 📚 API Endpoints

### GET `/api/articles`
Get all articles with optional filtering and sorting

**Query Parameters:**
- `category` - Filter by category (Food, Education, Businessmen, Positions)
- `search` - Search by title or description
- `sortBy` - Sort field (createdAt, title) - default: createdAt
- `order` - Sort order (asc, desc) - default: desc

**Example:**
```
GET /api/articles?category=Food&sortBy=createdAt&order=desc
```

### GET `/api/articles/:id`
Get a specific article by ID

### POST `/api/articles`
Create a new article

**Request Body:**
```json
{
  "title": "Article Title",
  "description": "Brief description",
  "category": "Food",
  "author": "Author Name",
  "content": "Full article content"
}
```

### PUT `/api/articles/:id`
Update an existing article

**Request Body:**
Same as POST endpoint

### DELETE `/api/articles/:id`
Delete an article

## 🎨 Component Structure

### Pages
- **Home.jsx** - Landing page with article list and filters
- **CreateArticle.jsx** - Form to create new articles
- **ArticleDetail.jsx** - Full article view with edit/delete options
- **EditArticle.jsx** - Form to edit existing articles

### Components
- **Navbar.jsx** - Navigation bar with links
- **ArticleCard.jsx** - Reusable card component for articles

### Redux
- **store.js** - Redux store configuration
- **articleSlice.js** - Redux slice with async thunks for API calls

## 🔄 Redux State Structure

```javascript
{
  articles: {
    articles: [],           // Array of all articles
    currentArticle: null,   // Currently viewed article
    loading: false,         // Loading state
    error: null,           // Error messages
    successMessage: null   // Success notifications
  }
}
```

## 📝 Validation Rules

### Article Fields
- **Title**: Required, max 200 characters
- **Description**: Required, min 10 characters
- **Category**: Required (Food, Education, Businessmen, Positions)
- **Author**: Required
- **Content**: Required

## 🚢 Production Build

### Backend
```bash
npm start
```

### Frontend
```bash
npm run build
npm run preview
```

## 📦 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on your system
- Check the connection string in `.env`
- Verify network access if using MongoDB Atlas

### Frontend Not Connecting to Backend
- Ensure backend is running on port 5000
- Check CORS configuration in server.js
- Verify proxy settings in vite.config.js

### Port Already in Use
- Change PORT in backend `.env` or `package.json`
- Change port in frontend vite.config.js

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📞 Support

For issues and questions, please create an issue in the repository.
