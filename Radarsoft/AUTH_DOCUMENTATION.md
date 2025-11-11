# Authentication System Documentation

## 🔐 Complete JWT Authentication Implementation

This application uses **Redux Toolkit** for state management and **JWT (JSON Web Tokens)** for user authentication.

## Architecture Overview

### Frontend Architecture
```
├── Redux Store (Redux Toolkit)
│   ├── auth slice - User authentication state
│   └── articles slice - Articles management state
├── Axios Interceptor - Automatic JWT token injection
├── Protected Routes - Route-level access control
└── Auth Components - Login, Register, Navbar
```

### Backend Architecture
```
├── User Model - User schema with password hashing
├── Auth Routes - Login, Register, Get Current User
├── Article Routes - CRUD operations with ownership verification
└── Auth Middleware - JWT verification
```

## 🔑 Key Features

### 1. **Redux Toolkit State Management**

#### Auth Slice (`redux/authSlice.js`)
```javascript
State Structure:
{
  auth: {
    user: {
      id: string,
      name: string,
      email: string
    },
    token: string,          // JWT token stored in localStorage
    loading: boolean,
    error: string | null,
    isAuthenticated: boolean
  }
}

Actions:
- register(userData)        // Create new account
- login(userData)          // Login with email/password
- getCurrentUser()         // Fetch logged-in user info
- logout()                 // Clear auth state and token
- clearError()            // Clear error messages
```

#### Articles Slice (`redux/articleSlice.js`)
```javascript
State Structure:
{
  articles: {
    articles: Article[],
    currentArticle: Article | null,
    loading: boolean,
    error: string | null,
    successMessage: string | null
  }
}

Actions:
- fetchArticles(params)    // Get all articles (public)
- fetchArticleById(id)     // Get single article (public)
- createArticle(data)      // Create article (protected)
- updateArticle({id, data}) // Update article (protected)
- deleteArticle(id)        // Delete article (protected)
```

### 2. **Axios Interceptor** (`api/axiosConfig.js`)

Automatically injects JWT token into all API requests:
```javascript
Request Interceptor:
- Retrieves token from localStorage
- Adds Authorization header: `Bearer ${token}`
- Applies to all API calls

Response Interceptor:
- Handles 401 (Unauthorized) errors
- Clears invalid/expired tokens
- Allows graceful logout on token expiration
```

### 3. **Protected Routes** (`components/ProtectedRoute.jsx`)

Route-level access control:
- `/create` - Create article (protected)
- `/edit/:id` - Edit article (protected)
- `/` - Home (public)
- `/login` - Login page (public)
- `/register` - Register page (public)
- `/article/:id` - View article (public)

### 4. **Ownership Verification**

**Backend (article routes):**
```javascript
// Check if user owns the article before allowing edit/delete
if (article.userId.toString() !== req.userId) {
  return 403 Forbidden
}
```

**Frontend (ArticleDetail.jsx):**
```javascript
const isOwner = isAuthenticated && user && 
                currentArticle?.userId?._id === user.id

// Show edit/delete buttons only if isOwner is true
```

## 🔐 Authentication Flow

### Registration Flow
```
1. User fills register form (name, email, password, confirmPassword)
2. Form validation on frontend
3. POST /api/auth/register with user data
4. Backend: Hash password, create user, generate JWT
5. Backend returns: { token, user }
6. Frontend: Store token in localStorage
7. Frontend: Update Redux auth state
8. Frontend: Redirect to home
9. Navbar shows user name and logout button
```

### Login Flow
```
1. User fills login form (email, password)
2. Form validation on frontend
3. POST /api/auth/login with credentials
4. Backend: Verify email/password, generate JWT
5. Backend returns: { token, user }
6. Frontend: Store token in localStorage
7. Frontend: Update Redux auth state
8. Frontend: Redirect to home
9. All subsequent requests include Authorization header
```

### Session Persistence Flow
```
1. App loads
2. useEffect in App.jsx runs
3. Check if token exists in localStorage
4. If yes: Dispatch getCurrentUser()
5. GET /api/auth/me with Authorization header
6. Backend validates JWT and returns user
7. Frontend updates Redux state
8. User remains logged in across page refreshes
```

### Logout Flow
```
1. User clicks logout button
2. Dispatch logout() action
3. Redux clears: user, token, isAuthenticated
4. localStorage.removeItem('token')
5. ProtectedRoute redirects from /create or /edit to /login
6. Navbar updates to show Login/Register buttons
```

### Protected Article Operations
```
Create Article:
1. User must be logged in (ProtectedRoute check)
2. POST /api/articles with Authorization header
3. Backend: Verify JWT, attach userId, save article

Update Article:
1. User must be logged in (ProtectedRoute check)
2. User must be article owner (verified on backend)
3. PUT /api/articles/:id with Authorization header
4. Backend: Verify JWT, check ownership, update

Delete Article:
1. User must be logged in (ProtectedRoute check)
2. User must be article owner (verified on backend)
3. DELETE /api/articles/:id with Authorization header
4. Backend: Verify JWT, check ownership, delete
```

## 🛠️ Implementation Details

### Token Storage
```javascript
// Store after login/register
localStorage.setItem('token', response.data.token)

// Retrieve for requests
const token = localStorage.getItem('token')

// Clear on logout
localStorage.removeItem('token')
```

### JWT Token Structure
```javascript
// Backend generates JWT
const token = jwt.sign(
  { id: user._id },                    // Payload
  process.env.JWT_SECRET,              // Secret
  { expiresIn: '7d' }                  // Options
)

// Token format: xxxxx.yyyyy.zzzzz
// Header.Payload.Signature
```

### Backend JWT Verification
```javascript
// Auth middleware (middleware/auth.js)
const token = req.headers.authorization?.split(' ')[1]
const decoded = jwt.verify(token, process.env.JWT_SECRET)
req.userId = decoded.id
next()

// Returns 401 if:
// - No token provided
// - Token is invalid
// - Token is expired
```

## 📊 User & Article Data Models

### User Model
```javascript
{
  _id: ObjectId,
  name: string (required),
  email: string (required, unique),
  password: string (hashed, required),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Article Model
```javascript
{
  _id: ObjectId,
  title: string (required, max 200),
  description: string (required, min 10),
  category: enum ['Food', 'Education', 'Businessmen', 'Positions'],
  author: string (required),
  content: string (required),
  userId: ObjectId (reference to User),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🔄 API Endpoints

### Auth Endpoints
```
POST   /api/auth/register   - Register new user
POST   /api/auth/login      - Login user
GET    /api/auth/me         - Get current user (protected)
```

### Article Endpoints
```
GET    /api/articles                 - Get all articles (public)
GET    /api/articles/:id             - Get single article (public)
POST   /api/articles                 - Create article (protected)
PUT    /api/articles/:id             - Update article (protected)
DELETE /api/articles/:id             - Delete article (protected)
```

## 🚀 How It Works

### Frontend Request with JWT
```javascript
// Axios interceptor automatically:
axiosInstance.get('/articles', {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIs...'
  }
})
```

### Backend Verification
```javascript
// Auth middleware extracts and verifies:
const token = 'eyJhbGciOiJIUzI1NiIs...'
const decoded = jwt.verify(token, JWT_SECRET)
// decoded = { id: '507f1f77bcf86cd799439011', iat: 1699..., exp: 1699... }
req.userId = '507f1f77bcf86cd799439011'
```

## 🔒 Security Features

1. **Password Hashing** - bcryptjs with 10 salt rounds
2. **JWT Tokens** - Cryptographically signed with secret key
3. **Token Expiration** - 7 days (can be configured)
4. **Protected Routes** - Frontend route access control
5. **Backend Verification** - User ownership verification
6. **Authorization Headers** - All protected requests require token
7. **Error Handling** - Graceful handling of token expiration

## 🧪 Testing Authentication

### Register New User
```bash
curl -X POST http://localhost:5001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123456","confirmPassword":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

### Create Article (requires token)
```bash
curl -X POST http://localhost:5001/api/articles \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Article","description":"Description","category":"Food","author":"John","content":"Content"}'
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/blog
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Frontend (automatic)
```
VITE_API_URL=http://localhost:5001/api
```

## 🐛 Troubleshooting

### Token Not Persisting
- Check browser localStorage (DevTools → Application)
- Verify token is being set after login
- Check token expiration in JWT

### Logout Not Working
- Check Redux dispatch is called
- Verify localStorage is cleared
- Check browser console for errors

### Edit/Delete Buttons Not Showing
- Verify user is logged in (check Navbar)
- Check article.userId matches current user.id
- Verify backend populates userId on article

### 401 Unauthorized Errors
- Token may have expired (7 days)
- Need to login again
- Check Authorization header format: `Bearer ${token}`

## 📚 Related Files

- `src/redux/authSlice.js` - Auth state management
- `src/redux/articleSlice.js` - Articles state management
- `src/api/axiosConfig.js` - Axios configuration with interceptors
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/pages/Login.jsx` - Login page
- `src/pages/Register.jsx` - Register page
- `src/components/Navbar.jsx` - Shows auth status
- `backend/routes/auth.js` - Auth endpoints
- `backend/routes/articles.js` - Article endpoints
- `backend/middleware/auth.js` - JWT verification
