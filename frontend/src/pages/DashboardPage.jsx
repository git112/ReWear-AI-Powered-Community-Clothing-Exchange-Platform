import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Upload, 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Plus,
  Eye,
  MessageSquare,
  User,
  LogOut,
  AlertCircle,
  Star
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { itemsAPI, swapsAPI, authAPI } from '../services/api'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { toast } from 'react-hot-toast'
import { ImageWithFallback } from '../utils/imageUtils.jsx'

export const DashboardPage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState(null)
  const [uploadedItems, setUploadedItems] = useState([])
  const [userSwaps, setUserSwaps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('🔍 Dashboard: Checking user state:', {
      user: user,
      hasUser: !!user,
      userId: user?.id || user?._id
    })
    
    if (!user?.id && !user?._id) {
      console.log('❌ Dashboard: No user ID found, redirecting to login')
      navigate('/login')
      return
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        setError(null)
        console.log('🔄 Dashboard: Starting to fetch data...')

        // Fetch user profile
        try {
          console.log('📊 Dashboard: Fetching user profile...')
          const profileResponse = await authAPI.getProfile()
          console.log('✅ Dashboard: Profile response:', profileResponse.data)
          setUserProfile(profileResponse.data.data.user)
        } catch (profileError) {
          console.error('❌ Dashboard: Profile fetch failed:', profileError)
          // Continue with other data even if profile fails
        }

        // Fetch user's uploaded items
        try {
          console.log('📦 Dashboard: Fetching uploaded items...')
          const itemsResponse = await itemsAPI.getMyUploads()
          console.log('✅ Dashboard: Items response:', itemsResponse.data)
          setUploadedItems(itemsResponse.data.data || [])
        } catch (itemsError) {
          console.error('❌ Dashboard: Items fetch failed:', itemsError)
          setUploadedItems([])
        }

        // Fetch user's swaps
        try {
          console.log('🔄 Dashboard: Fetching swaps...')
          const swapsResponse = await swapsAPI.getMine()
          console.log('✅ Dashboard: Swaps response:', swapsResponse.data)
          setUserSwaps(swapsResponse.data.data || [])
        } catch (swapsError) {
          console.error('❌ Dashboard: Swaps fetch failed:', swapsError)
          setUserSwaps([])
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setError('Failed to load dashboard data')
        toast.error('Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'completed':
        return <Star className="w-4 h-4 text-blue-500" />
      case 'rejected':
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'accepted':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'completed':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'rejected':
      case 'cancelled':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getItemStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'swapped':
        return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'removed':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }



  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {userProfile?.name || user?.name}! 👋
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your sustainable fashion journey
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-error flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card bg-white shadow-lg"
            >
              <div className="card-body">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{userProfile?.name || user?.name}</h2>
                    <p className="text-gray-600">{userProfile?.email || user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Points</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">{userProfile?.points || user?.points || 0}</span>
                </div>

                {userProfile?.bio && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{userProfile.bio}</p>
                  </div>
                )}

                {userProfile?.location && (
                  <div className="mt-2 text-sm text-gray-500">
                    📍 {userProfile.location}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Items</p>
                      <p className="text-2xl font-bold text-gray-900">{uploadedItems.length}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100">
                      <ShoppingBag className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Swaps</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {userSwaps.filter(swap => ['pending', 'accepted'].includes(swap.status)).length}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-100">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Completed Swaps</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {userSwaps.filter(swap => swap.status === 'completed').length}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-100">
                      <CheckCircle className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card bg-white shadow-lg"
            >
              <div className="card-body">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    to="/upload"
                    className="btn btn-primary w-full flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Upload New Item
                  </Link>
                  <Link
                    to="/browse"
                    className="btn btn-outline w-full flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Browse Items
                  </Link>
                  <Link
                    to="/swaps"
                    className="btn btn-outline w-full flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    View All Swaps
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Items & Swaps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Uploaded Items */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card bg-white shadow-lg"
            >
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">My Uploaded Items</h2>
                  <Link
                    to="/upload"
                    className="btn btn-primary btn-sm flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Upload New
                  </Link>
                </div>
              </div>
              <div className="card-body">
                {uploadedItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No items uploaded yet</h3>
                    <p className="text-gray-600 mb-6">Start sharing your clothes with the community!</p>
                    <Link to="/upload" className="btn btn-primary">
                      Upload Your First Item
                    </Link>
                  </div>
                ) : (
                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {uploadedItems.slice(0, 4).map((item) => (
                       <div key={item._id || item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        <div className="h-48 bg-gray-100">
                          <ImageWithFallback
                            src={item.image_urls?.[0]}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getItemStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                                                         <Link
                               to={`/items/${item._id || item.id}`}
                               className="btn btn-ghost btn-sm"
                             >
                              <Eye className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {uploadedItems.length > 4 && (
                  <div className="mt-4 text-center">
                    <Link to="/profile" className="btn btn-outline">
                      View All Items ({uploadedItems.length})
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Swap Requests */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card bg-white shadow-lg"
            >
              <div className="card-header">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">My Swap Requests</h2>
                  <Link
                    to="/swaps"
                    className="btn btn-outline btn-sm"
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div className="card-body">
                {userSwaps.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No swap activity yet</h3>
                    <p className="text-gray-600 mb-6">Start browsing items to make your first swap request!</p>
                    <Link to="/browse" className="btn btn-primary">
                      Browse Items
                    </Link>
                  </div>
                ) : (
                                     <div className="space-y-4">
                     {userSwaps.slice(0, 5).map((swap) => (
                       <div key={swap._id || swap.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={swap.item_id?.image_urls?.[0]}
                            alt={swap.item_id?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">{swap.item_id?.title}</h3>
                          <p className="text-sm text-gray-600">
                            {swap.requester_id?._id === user?.id ? 'Requested by you' : `Requested from ${swap.requester_id?.name}`}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(swap.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(swap.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(swap.status)}`}>
                            {swap.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {userSwaps.length > 5 && (
                  <div className="mt-4 text-center">
                    <Link to="/swaps" className="btn btn-outline">
                      View All Swaps ({userSwaps.length})
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 