# ReWear ♻️

A community-driven clothing exchange platform that promotes sustainable fashion through swapping, points system, and content moderation.

## 🌟 Features

- **User Authentication**: Secure JWT-based login/signup
- **Item Management**: Upload, list, and manage clothing items
- **Swapping System**: Request, accept, and reject clothing swaps
- **Points System**: Earn points for uploads, spend on redemptions
- **Admin Dashboard**: Content moderation and user management
- **Real-time Updates**: Live swap status and notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **React Hook Form** for form management
- **Zod** for validation

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** for authentication
- **Cloudinary** for image uploads
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

### Development Tools
- **ESLint** + **Prettier** for code formatting
- **Concurrently** for running both servers
- **Nodemon** for backend development

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Cloudinary account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rewear
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Environment Setup**
   ```bash
   # Copy environment files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

4. **Configure Environment Variables**
   
   **Backend (.env):**
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/rewear
   JWT_SECRET=your-super-secret-jwt-key
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

   **Frontend (.env):**
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   ```

5. **Setup Database**
   ```bash
   npm run setup:db
   ```

6. **Start Development Servers**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
rewear/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── utils/          # Utility functions
│   │   └── styles/         # Global styles
│   └── public/             # Static assets
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── database/           # Database migrations and seeds
└── docs/                   # Documentation
```

## 🎯 Core Features

### User Authentication
- Secure registration and login
- JWT token management
- Protected routes
- Password reset functionality

### Item Management
- Upload clothing items with images
- Categorize by type, size, condition
- Add tags for better discovery
- Real-time status updates

### Swapping System
- Request items from other users
- Accept/reject swap requests
- Points-based redemption system
- Swap history tracking

### Admin Features
- Content moderation dashboard
- User management
- Analytics and reports
- System configuration

## 🎨 UI/UX Highlights

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, sustainable-themed design
- **Smooth Animations**: Engaging user interactions
- **Loading States**: Better user experience
- **Error Handling**: Comprehensive error messages
- **Accessibility**: WCAG compliant components

## 🔒 Security Features

- Input validation (frontend + backend)
- SQL injection prevention
- XSS protection
- CORS configuration
- Rate limiting
- Secure file uploads

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  points INTEGER DEFAULT 0,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
---

**Built with ♻️ for a sustainable future!** 