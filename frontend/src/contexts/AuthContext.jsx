import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { authAPI } from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔐 Initializing auth state...')
      console.log('Token exists:', !!token)
      console.log('User exists:', !!user)
      
      if (token && !user) {
        try {
          console.log('🔄 Fetching current user...')
          const response = await authAPI.getCurrentUser()
          console.log('✅ User data received:', response.data)
          setUser(response.data.data.user)
        } catch (error) {
          console.error('❌ Failed to get current user:', error)
          localStorage.removeItem('token')
          setToken(null)
        }
      } else if (!token) {
        console.log('❌ No token found, user not authenticated')
      } else {
        console.log('✅ User already loaded')
      }
      setLoading(false)
    }
    initializeAuth()
    // eslint-disable-next-line
  }, [token])

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true)
      const response = await authAPI.login(email, password)
      const { user: userData, token: authToken } = response.data.data
      
      setUser(userData)
      setToken(authToken)
      localStorage.setItem('token', authToken)
      
      toast.success('Login successful!')
      navigate('/dashboard')
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true)
      const response = await authAPI.register(userData)
      const { user: newUser, token: authToken } = response.data.data
      
      setUser(newUser)
      setToken(authToken)
      localStorage.setItem('token', authToken)
      
      toast.success('Registration successful! Welcome to ReWear!')
      navigate('/dashboard')
      
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    toast.success('Logged out successfully')
    navigate('/')
  }

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData)
      setUser(response.data.data.user)
      toast.success('Profile updated successfully')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update profile'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    try {
      await authAPI.changePassword(currentPassword, newPassword)
      toast.success('Password changed successfully')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password'
      toast.error(message)
      return { success: false, error: message }
    }
  }

  // Update user points (for real-time updates)
  const updateUserPoints = (newPoints) => {
    setUser(prev => prev ? { ...prev, points: newPoints } : null)
  }

  // Check if user is admin
  const isAdmin = user?.isAdmin || false

  // Check if user is authenticated
  const isAuthenticated = !loading && !!user && !!token
  
  console.log('🔍 Auth state check:', {
    loading,
    hasUser: !!user,
    hasToken: !!token,
    isAuthenticated
  })

  const refreshUser = async () => {
    try {
      const res = await authAPI.getCurrentUser();
      setUser(res.data.data.user);
    } catch (e) {}
  };

  const value = {
    user,
    loading,
    token,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    updateUserPoints,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 