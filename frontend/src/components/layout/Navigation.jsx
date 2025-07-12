import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  Upload, 
  ShoppingBag,
  Bell,
  Crown,
  ChevronDown
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { cn } from '../../utils/cn'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Browse', path: '/browse' },
    ...(isAuthenticated ? [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Upload', path: '/upload' },
      { name: 'Swaps', path: '/swaps' },
    ] : []),
    ...(isAdmin ? [
      { name: 'Admin', path: '/admin' },
    ] : []),
  ]

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      "bg-black/70 backdrop-blur-xl shadow-xl border-b-2 border-primary-500/60",
      isScrolled && "shadow-2xl"
    )}>
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 relative">
          {/* Green accent bar */}
          <div className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-primary-500 shadow-md" />
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group relative z-10">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="text-3xl"
            >
              ♻️
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-white drop-shadow-md group-hover:scale-105 transition-transform">
                ReWear
              </h1>
              <p className="text-xs text-white/80 -mt-1 drop-shadow">Sustainable Fashion</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "nav-link font-medium transition-colors duration-200 text-white drop-shadow",
                  location.pathname === item.path && "nav-link-active text-primary-300 underline underline-offset-8 decoration-2"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-primary-500/10 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    {user?.avatarUrl ? (
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-primary-600" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-white drop-shadow">
                    {user?.name}
                  </span>
                  <ChevronDown size={16} className="text-white/70" />
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-black/90 rounded-lg shadow-sustainable-lg border border-primary-500/40 py-2"
                    >
                      <div className="px-4 py-2 border-b border-primary-500/30">
                        <p className="text-sm font-medium text-white">{user?.name}</p>
                        <p className="text-xs text-primary-200">{user?.email}</p>
                        <div className="flex items-center mt-1">
                          <span className="points-display">
                            {user?.points} points
                          </span>
                          {isAdmin && (
                            <span className="ml-2 badge badge-primary">
                              <Crown size={12} className="mr-1" />
                              Admin
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-primary-100 hover:bg-primary-500/10 transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User size={16} className="mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-primary-100 hover:bg-primary-500/10 transition-colors duration-200"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings size={16} className="mr-3" />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors duration-200"
                      >
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="btn btn-ghost text-white border-white/40 hover:bg-white/10"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary-500/10 transition-colors duration-200 text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 border-t border-primary-500/40 shadow-lg backdrop-blur-xl"
          >
            <div className="container-responsive py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block py-2 text-lg font-medium transition-colors duration-200 text-white hover:text-primary-300",
                    location.pathname === item.path 
                      ? "text-primary-300 underline underline-offset-8 decoration-2" 
                      : "hover:text-primary-200"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <div className="pt-4 border-t border-primary-500/40">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      {user?.avatarUrl ? (
                        <img 
                          src={user.avatarUrl} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-primary-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-white drop-shadow">{user?.name}</p>
                      <p className="text-xs text-primary-200">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    className="block py-2 text-white hover:bg-primary-500/10 rounded transition-colors duration-200"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-white hover:bg-primary-500/10 rounded transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full py-2 text-red-400 hover:bg-red-900/20 rounded transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 