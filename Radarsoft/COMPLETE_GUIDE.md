# 🎉 Complete Blog Application - MERN Stack with JWT Authentication

A full-stack blog application built with **React**, **Express.js**, **MongoDB**, and **Node.js**. Features **Redux Toolkit** for state management, **JWT** for secure authentication, and **Bootstrap** for styling.

## ✨ Features

### User Authentication
- ✅ User Registration with validation
- ✅ User Login with JWT tokens
- ✅ JWT token persistence (7 days)
- ✅ Automatic token injection in API calls
- ✅ Session persistence across page refreshes
- ✅ Secure logout with token cleanup
- ✅ Protected routes (redirect to login if unauthorized)

### Article Management
- ✅ Create articles (logged-in users only)
- ✅ View all articles (public)
- ✅ View article details (public)
- ✅ Edit articles (only by article owner)
- ✅ Delete articles (only by article owner)
- ✅ Article ownership tracking via userId

### Search & Filtering
- ✅ Search by title or description
- ✅ Filter by category (Food, Education, Businessmen, Positions)
- ✅ Sort by date (newest/oldest first)
- ✅ Sort by title (A-Z)

### User Interface
- ✅ Responsive design with Bootstrap
- ✅ Beautiful gradient navbar
- ✅ User profile display in navbar
- ✅ Loading states and spinners
- ✅ Error/success notifications
- ✅ Form validation with error messages

## 🏗️ Project Structure

```
Radarsoft/
├── backend/
│   ├── models/
│   │   ├── User.js              # User schema with password hashing
│   │   └── Article.js           # Article schema with userId reference
│   ├── routes/
│   │   ├── auth.js              # Auth endpoints (register, login, getCurrentUser)
│   │   └── articles.js          # Article CRUD with ownership verification
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── server.js                # Express app setup
│   ├── package.json             # Backend dependencies
│   ├── .env.example             # Environment variables template
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosConfig.js   # Axios with JWT interceptor
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Navigation with auth status
│   │   │   ├── ArticleCard.jsx  # Reusable article card
│   │   │   └── ProtectedRoute.jsx # Route protection component
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Article list with filters
│   │   │   ├── Login.jsx        # User login page
│   │   │   ├── Register.jsx     # User registration page
│   │   │   ├── CreateArticle.jsx # Create article form
│   │   │   ├── ArticleDetail.jsx # View article with edit/delete
│   │   │   └── EditArticle.jsx  # Edit article form
│   │   ├── redux/
│   │   │   ├── store.js         # Redux store configuration
│   │   │   ├── authSlice.js     # Auth state & actions
│   │   │   └── articleSlice.js  # Articles state & actions
│   │   ├── styles/              # Component-specific CSS
│   │   ├── App.jsx              # App routing with protected routes
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Global styles
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   ├── package.json             # Frontend dependencies
│   └── .gitignore
│
├── README.md                    # Project overview
├── AUTH_DOCUMENTATION.md        # Complete auth system docs
├── IMPLEMENTATION_SUMMARY.md    # Feature summary
└── start.sh                     # Start script (optional)
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud)
- **npm** or **yarn**

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

5. Start backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to frontend directory (in a new terminal):
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend dev server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Using the Application

1. **Register**: Go to http://localhost:3000/register
   - Create new account with name, email, password
   - Automatically logged in after registration

2. **Login**: Go to http://localhost:3000/login
   - Enter email and password
   - Token stored in localStorage for 7 days

3. **Create Article**: Click "Create Article" (navbar, logged-in only)
   - Fill article form and submit
   - Article created with your userId

4. **View Articles**: Home page shows all articles
   - Use filters to search by category or text
   - Click "Read More" to view full article

5. **Edit Article**: View your own article
   - Click "Edit Article" button (owner only)
   - Update and save changes

6. **Delete Article**: View your own article
   - Click "Delete Article" button (owner only)
   - Confirm deletion

7. **Logout**: Click "Logout" button in navbar
   - Token cleared from localStorage
   - Redirected to home

## 🔐 Authentication System

### Technologies Used
- **JWT (JSON Web Tokens)** - User authentication
- **bcryptjs** - Password hashing
- **Redux Toolkit** - State management
- **Axios Interceptors** - Automatic token injection

### How It Works

1. **Registration/Login**
   - User submits credentials
   - Backend generates JWT token (7-day expiration)
   - Frontend stores token in localStorage
   - Redux state updated with user info

2. **Protected Requests**
   - Axios interceptor automatically adds Authorization header
   - Backend middleware verifies JWT
   - Returns 401 if token is invalid/expired

3. **Session Persistence**
   - Token stored in localStorage
   - On app load, frontend checks for existing token
   - Automatically logs user in if token valid
   - Persists across page refreshes

4. **Protected Routes**
   - `/create` and `/edit/:id` require authentication
   - ProtectedRoute component redirects to login if not authenticated
   - Frontend validates before sending requests

5. **Article Ownership**
   - Articles include userId reference
   - Backend verifies user owns article before edit/delete
   - Frontend only shows edit/delete for article owner

## 📊 API Endpoints

### Authentication
```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user (requires token)
```

### Articles
```
GET    /api/articles               Get all articles (public)
  Query params:
  - category: Filter by category
  - search: Search by title/description
  - sortBy: createdAt or title
  - order: asc or desc

GET    /api/articles/:id           Get single article (public)
POST   /api/articles               Create article (requires token)
PUT    /api/articles/:id           Update article (requires token + ownership)
DELETE /api/articles/:id           Delete article (requires token + ownership)
```

## 🔄 Data Flow Diagrams

### Login Flow
```
User → Register Form → POST /auth/register → Backend validates
→ Hash password, create user, generate JWT → Return token + user
→ Store token in localStorage → Update Redux state
→ Redirect to home → Show user in navbar
```

### Article Creation
```
Logged-in user → Click "Create Article" → ProtectedRoute allows access
→ Fill form → POST /articles + JWT token → Backend verifies token + userId
→ Save article with userId → Return article → Update Redux
→ Redirect to home → Show success message
```

### Article Edit/Delete
```
Article owner → Click "Edit/Delete" → ProtectedRoute allows access
→ Send request with JWT + article data/delete → Backend verifies ownership
→ Update/Delete article → Return response → Update Redux
→ Redirect to home/article → Show success message
```

## 🛠️ Key Technologies

### Frontend
- **React 18** - UI library with hooks
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Vite** - Fast build tool
- **Axios** - HTTP client with interceptors
- **Bootstrap 5** - CSS framework
- **React Bootstrap** - Bootstrap components

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📚 State Management with Redux Toolkit

### Auth Slice
```javascript
State: {
  user: { id, name, email },
  token: string,
  isAuthenticated: boolean,
  loading: boolean,
  error: string | null
}

Actions:
- register(userData)
- login(userData)
- getCurrentUser()
- logout()
- clearError()
```

### Articles Slice
```javascript
State: {
  articles: Article[],
  currentArticle: Article | null,
  loading: boolean,
  error: string | null,
  successMessage: string | null
}

Actions:
- fetchArticles(params)
- fetchArticleById(id)
- createArticle(data)
- updateArticle({ id, data })
- deleteArticle(id)
- clearError()
```

## 🔒 Security Features

1. **Password Hashing**
   - bcryptjs with 10 salt rounds
   - Never store plain text passwords

2. **JWT Tokens**
   - Cryptographically signed with secret key
   - 7-day expiration
   - Verified on every protected request

3. **Protected Routes**
   - Frontend prevents unauthorized access
   - Redirects to login if not authenticated

4. **Ownership Verification**
   - Backend verifies user owns article before edit/delete
   - 403 Forbidden if unauthorized

5. **Automatic Token Injection**
   - Axios interceptor handles Authorization header
   - No manual token management in components

6. **Token Expiration Handling**
   - Axios response interceptor handles 401 errors
   - Clears invalid tokens
   - Allows graceful logout

## 🧪 Testing the Application

### Create Test User
```javascript
// Register via UI at /register
Name: John Doe
Email: john@example.com
Password: password123
```

### Create Test Article
```javascript
// After login, click "Create Article"
Title: My First Article
Description: This is a test article
Category: Food
Author: John Doe
Content: This is the full article content
```

### Edit Article
```javascript
// View your article
// Click "Edit Article"
// Change fields
// Click "Update Article"
```

### Test Article Ownership
```javascript
// Try to edit another user's article
// Edit button will NOT appear
// Direct URL access will show "Not authorized" on backend
```

## 📝 Environment Configuration

### Development (.env)
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=dev_secret_key_change_in_production
NODE_ENV=development
```

### Production (example)
```
PORT=5001
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/blog
JWT_SECRET=production_secret_key_very_long_secure
NODE_ENV=production
```

## 🐛 Troubleshooting

### "Cannot find module" errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### MongoDB connection issues
```bash
# Check MongoDB is running
mongod

# Or use MongoDB Atlas cloud
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blog
```

### Token not persisting
- Check browser localStorage (DevTools → Application)
- Verify token is returned from login endpoint
- Check 7-day expiration hasn't passed

### Edit/Delete not showing
- Verify you're logged in (check navbar)
- Verify you created the article (check userId matches)
- Check article.userId is populated correctly

### 401 Unauthorized errors
- Token may have expired (login again)
- Check Authorization header is being sent
- Verify JWT_SECRET matches on backend

## 🚀 Production Deployment

### Backend (Heroku example)
```bash
cd backend
heroku create blog-app-api
heroku config:set JWT_SECRET=your_production_secret
heroku config:set MONGODB_URI=your_mongodb_atlas_url
git push heroku main
```

### Frontend (Vercel example)
```bash
cd frontend
npm run build
vercel deploy --prod
```

## 📈 Future Enhancements

- [ ] Password reset functionality
- [ ] Email verification on registration
- [ ] Role-based access control (admin, editor, viewer)
- [ ] Refresh tokens for better security
- [ ] Rate limiting on auth endpoints
- [ ] User profile page
- [ ] Article comments/ratings
- [ ] Social sharing features
- [ ] Dark mode toggle
- [ ] Multi-language support

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Support

For issues or questions:
1. Check the AUTH_DOCUMENTATION.md for detailed auth system info
2. Check the IMPLEMENTATION_SUMMARY.md for feature summary
3. Review error messages in browser console
4. Check backend logs in terminal

## 🎓 Learning Resources

- Redux Toolkit: https://redux-toolkit.js.org/
- JWT: https://jwt.io/
- React Router: https://reactrouter.com/
- Axios: https://axios-http.com/
- Express.js: https://expressjs.com/
- MongoDB: https://www.mongodb.com/

---

**Happy Coding! 🚀**
