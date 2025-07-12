import axios from 'axios'

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/signup', userData),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  changePassword: (currentPassword, newPassword) => 
    api.post('/auth/change-password', { currentPassword, newPassword }),
}

// Items API
export const itemsAPI = {
  getAll: (params) => api.get('/items', { params }),
  getById: (id) => api.get(`/items/${id}`),
  create: (itemData) => api.post('/items', itemData),
  update: (id, itemData) => api.put(`/items/${id}`, itemData),
  delete: (id) => api.delete(`/items/${id}`),
  getByUser: (userId, params) => api.get(`/items/user/${userId}`, { params }),
}

// Swaps API
export const swapsAPI = {
  getAll: (params) => api.get('/swaps', { params }),
  getById: (id) => api.get(`/swaps/${id}`),
  create: (swapData) => api.post('/swaps', swapData),
  accept: (id) => api.put(`/swaps/${id}/accept`),
  reject: (id) => api.put(`/swaps/${id}/reject`),
  complete: (id) => api.put(`/swaps/${id}/complete`),
  cancel: (id) => api.delete(`/swaps/${id}`),
}

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  getById: (id) => api.get(`/users/${id}`),
  getItems: (id, params) => api.get(`/users/${id}/items`, { params }),
  getNotifications: (params) => api.get('/users/notifications', { params }),
  markNotificationRead: (id) => api.put(`/users/notifications/${id}/read`),
  markAllNotificationsRead: () => api.put('/users/notifications/read-all'),
  getStats: () => api.get('/users/stats'),
}

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params) => api.get('/admin/users', { params }),
  getItems: (params) => api.get('/admin/items', { params }),
  banUser: (id, banned) => api.put(`/admin/users/${id}/ban`, { banned }),
  approveItem: (id, approved) => api.put(`/admin/items/${id}/approve`, { approved }),
  getAnalytics: (params) => api.get('/admin/analytics', { params }),
  getReports: (params) => api.get('/admin/reports', { params }),
}

// File upload helper
export const uploadFile = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  
  return response.data
}

// Cloudinary upload helper
export const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'rewear')
  
  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  )
  
  return response.data.secure_url
}

export default api 