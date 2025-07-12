# ReWear ♻️

A community-driven clothing exchange platform that promotes sustainable fashion through swapping, points system, and content moderation.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Features

### 🔐 User Authentication & Security
- **JWT-based Authentication**: Secure login/signup with token-based sessions
- **Password Hashing**: Bcrypt encryption for user passwords
- **Protected Routes**: Role-based access control for users and admins
- **Rate Limiting**: API protection against abuse

### 👕 Item Management
- **Upload & List**: Share clothing items with detailed descriptions
- **Image Upload**: Cloudinary integration for image storage
- **Categories & Tags**: Organized item classification
- **Condition Tracking**: Item quality assessment system

### 🔄 Swapping System
- **Request Swaps**: Browse and request items from other users
- **Accept/Reject**: Manage incoming swap requests
- **Status Tracking**: Real-time swap status updates
- **Notification System**: Instant updates on swap activities

### 🎯 Points System
- **Earn Points**: Gain points for uploading items
- **Spend Points**: Use points to request items
- **Balance Tracking**: Monitor your point balance
- **Redemption System**: Exchange points for items

### 👨‍💼 Admin Dashboard
- **User Management**: View and manage all users
- **Content Moderation**: Approve/reject uploaded items
- **Analytics**: Platform usage statistics
- **Reports**: User feedback and issue tracking

### 📱 Modern UI/UX
- **Responsive Design**: Mobile-first approach
- **Real-time Updates**: Live notifications and status changes
- **Smooth Animations**: Framer Motion for enhanced UX
- **Dark/Light Mode**: Customizable theme support

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form state management
- **Zod** - TypeScript-first schema validation
- **Axios** - HTTP client for API calls
- **Framer Motion** - Animation library
- **React Query** - Server state management
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image storage
- **Express Validator** - Input validation
- **Morgan** - HTTP request logger
- **Helmet** - Security middleware

### Development Tools
- **ESLint** + **Prettier** - Code formatting and linting
- **Nodemon** - Auto-restart for development
- **Concurrently** - Run multiple commands
- **Jest** - Testing framework
