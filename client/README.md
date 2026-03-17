# React Auth & CRUD Practice Project

A practice project for learning React, TypeScript, Authentication, CRUD operations, Protected Routes, and Token Refresh.

## Features

- 🔐 **Authentication**: Login and Register with JWT tokens
- 🔄 **Token Refresh**: Automatic token refresh mechanism
- 🛡️ **Protected Routes**: Route protection with role-based access control
- 👥 **Roles**: User and Admin roles with different permissions
- 📝 **CRUD Operations**: Full Create, Read, Update, Delete for Posts
- 🎨 **Pure CSS**: No CSS frameworks, custom styling
- 📱 **Responsive**: Mobile-friendly design

## Tech Stack

- **React 18** with TypeScript
- **React Router v6** for routing
- **Axios** for API calls
- **Pure CSS** (no frameworks)

## Project Structure

```
src/
  components/
    auth/          # LoginForm, RegisterForm
    posts/         # PostList, PostCard, PostForm
    common/        # Navbar, ProtectedRoute
  pages/           # Landing, Login, Register, Dashboard, Posts, Profile, Admin
  services/        # api.ts, auth.ts, posts.ts
  types/           # TypeScript interfaces
  App.tsx
  main.tsx
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## API Configuration

Update the `API_BASE_URL` in `src/services/api.ts` to point to your backend API.

Expected API endpoints:
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/auth/refresh` - Refresh token
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

## Routes

- `/` - Landing page (public)
- `/login` - Login page (public)
- `/register` - Register page (public)
- `/dashboard` - Dashboard (protected, all users)
- `/posts` - Posts CRUD (protected, all users)
- `/profile` - User profile (protected, all users)
- `/admin` - Admin panel (protected, admin only)

## Features Explained

### Authentication
- JWT tokens stored in localStorage
- Access token and refresh token management
- Automatic token refresh on 401 errors

### Protected Routes
- `ProtectedRoute` component checks authentication
- Optional `requiredRole` prop for role-based access
- Redirects to login if not authenticated

### CRUD Operations
- Create, read, update, and delete posts
- Users can only edit/delete their own posts
- Admins can edit/delete any post

### Role-Based Access
- **User role**: Can create and manage own posts
- **Admin role**: Can access admin panel and manage all posts

