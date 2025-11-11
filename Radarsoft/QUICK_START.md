# 🚀 Quick Start Guide

## Start the Application (5 minutes)

### Option 1: Start Both Servers in Separate Terminals

**Terminal 1 - Backend:**
```bash
cd /Users/hp/Desktop/companies/Radarsoft/backend
npm run dev
```
✅ Backend runs on http://localhost:5001

**Terminal 2 - Frontend:**
```bash
cd /Users/hp/Desktop/companies/Radarsoft/frontend
npm run dev
```
✅ Frontend runs on http://localhost:3000

### Option 2: Using the Start Script
```bash
cd /Users/hp/Desktop/companies/Radarsoft
chmod +x start.sh
./start.sh
```

---

## 🎯 First Steps

### 1️⃣ Register a New User
- Go to http://localhost:3000/register
- Fill in the form (name, email, password)
- Click "Register"
- You'll be automatically logged in

### 2️⃣ Create Your First Article
- Click "Create Article" button in navbar
- Fill in the form:
  - **Title**: "My First Blog Post"
  - **Description**: "A brief description"
  - **Category**: "Food" (or any category)
  - **Author**: Your name (auto-filled)
  - **Content**: Your article content
- Click "Create Article"

### 3️⃣ View Your Articles
- Go to home page
- You'll see all articles
- Click "Read More" to view full article
- Only you can see "Edit" and "Delete" buttons

### 4️⃣ Edit Your Article
- View your article
- Click "Edit Article" (only visible to you)
- Update fields
- Click "Update Article"

### 5️⃣ Delete Your Article
- View your article
- Click "Delete Article" (only visible to you)
- Confirm deletion

### 6️⃣ Search & Filter
- Use filter panel on home page
- Search by title or description
- Filter by category
- Sort by date or title
- Sort ascending or descending

### 7️⃣ Logout
- Click "Logout" button in navbar
- You'll be logged out and redirected to home
- Login/Register buttons appear in navbar

---

## 📊 What's Included

✅ **User Authentication**
- Registration with validation
- Login with JWT token
- Automatic token persistence
- Secure logout

✅ **Article Management**
- Create articles (logged-in users only)
- View all articles (public)
- Edit own articles
- Delete own articles

✅ **Search & Filters**
- Search by title/description
- Filter by category
- Sort by date or title
- Sort ascending/descending

✅ **Beautiful UI**
- Responsive design
- Bootstrap styling
- Gradient navbar
- User profile display
- Loading states
- Error handling

---

## 🔐 Authentication Features

- **JWT Tokens** - Secure user authentication
- **Token Persistence** - Login for 7 days
- **Protected Routes** - Redirect to login if not authenticated
- **Ownership Verification** - Only users can edit/delete their articles
- **Automatic Token Injection** - All API calls include token
- **Session Persistence** - Stay logged in after page refresh

---

## 📂 Project Files

### Key Frontend Files
- `src/redux/authSlice.js` - Authentication state management
- `src/redux/articleSlice.js` - Articles state management
- `src/api/axiosConfig.js` - JWT token interceptor
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/pages/Login.jsx` - Login page
- `src/pages/Register.jsx` - Register page

### Key Backend Files
- `models/User.js` - User database model
- `models/Article.js` - Article database model
- `routes/auth.js` - Authentication routes
- `routes/articles.js` - Article CRUD routes
- `middleware/auth.js` - JWT verification

---

## 🐛 Common Issues

### Backend not starting
```bash
# Port 5001 might be in use
# Change port in backend/.env or kill process using port
lsof -i :5001
kill -9 <PID>
```

### Frontend not starting
```bash
# Port 3000 might be in use
# Change port in frontend/vite.config.js
```

### MongoDB connection error
```bash
# Make sure MongoDB is running
# Or update MONGODB_URI in backend/.env
```

### Login not working
```bash
# Check backend is running on http://localhost:5001
# Check network tab in DevTools
# Verify JWT_SECRET in backend/.env
```

---

## 📚 Documentation

For more detailed information:
- `README.md` - Project overview
- `AUTH_DOCUMENTATION.md` - Complete authentication system
- `IMPLEMENTATION_SUMMARY.md` - Feature summary
- `COMPLETE_GUIDE.md` - Comprehensive guide

---

## ✨ Tech Stack

### Frontend
- React 18 with Hooks
- Redux Toolkit
- Vite
- Bootstrap 5
- Axios
- React Router v6

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

## 🎉 You're All Set!

The application is fully functional with:
- ✅ User authentication (Register/Login/Logout)
- ✅ Article CRUD operations
- ✅ Search and filtering
- ✅ Article ownership verification
- ✅ Beautiful responsive UI
- ✅ Redux Toolkit state management
- ✅ JWT token-based authentication
- ✅ Protected routes

**Start creating awesome blog posts! 🚀**
