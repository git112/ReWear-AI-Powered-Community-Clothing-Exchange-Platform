import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
  MessageSquare
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { itemsAPI } from '../services/api'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export const DashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalItems: 0,
    activeSwaps: 0,
    completedSwaps: 0,
    points: 0
  })
  const [recentItems, setRecentItems] = useState([])
  const [recentSwaps, setRecentSwaps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.id) return; // Don't fetch if user is not loaded
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        // Fetch user's items
        const itemsResponse = await itemsAPI.getByUser(user.id)
        const userItems = itemsResponse.data.data || []
        
        // Calculate stats
        setStats({
          totalItems: userItems.length,
          activeSwaps: userItems.filter(item => item.status === 'swapped').length,
          completedSwaps: 0, // This would come from swaps API
          points: user?.points || 0
        })
        
        // Set recent items
        setRecentItems(userItems.slice(0, 5))
        
        // Mock recent swaps data (would come from swaps API)
        setRecentSwaps([
          {
            id: 1,
            itemTitle: 'Vintage Denim Jacket',
            status: 'pending',
            date: '2024-01-15'
          },
          {
            id: 2,
            itemTitle: 'Summer Dress',
            status: 'completed',
            date: '2024-01-10'
          }
        ])
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  const statCards = [
    {
      title: 'Total Items',
      value: stats.totalItems,
      icon: ShoppingBag,
      color: 'primary',
      description: 'Items you\'ve uploaded'
    },
    {
      title: 'Active Swaps',
      value: stats.activeSwaps,
      icon: Heart,
      color: 'secondary',
      description: 'Current swap requests'
    },
    {
      title: 'Completed Swaps',
      value: stats.completedSwaps,
      icon: CheckCircle,
      color: 'success',
      description: 'Successful exchanges'
    },
    {
      title: 'Points Earned',
      value: stats.points,
      icon: TrendingUp,
      color: 'warning',
      description: 'Your sustainability score'
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      case 'completed':
        return 'text-green-600 bg-green-50'
      case 'rejected':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-earth-900 mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-earth-600">
          Here's what's happening with your sustainable fashion journey
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-earth-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-earth-900">{stat.value}</p>
                  <p className="text-xs text-earth-500 mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-earth-900">Recent Items</h2>
              <Link
                to="/upload"
                className="btn btn-primary btn-sm"
              >
                <Plus size={16} className="mr-1" />
                Upload New
              </Link>
            </div>
          </div>
          <div className="card-body">
            {recentItems.length === 0 ? (
              <div className="text-center py-8">
                <Upload className="w-12 h-12 text-earth-300 mx-auto mb-4" />
                <p className="text-earth-600 mb-4">You haven't uploaded any items yet</p>
                <Link to="/upload" className="btn btn-primary">
                  Upload Your First Item
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 rounded-lg bg-earth-50">
                    <div className="w-12 h-12 bg-earth-200 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-6 h-6 text-earth-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-earth-900">{item.title}</h3>
                      <p className="text-sm text-earth-600">{item.category}</p>
                    </div>
                    <Link
                      to={`/items/${item.id}`}
                      className="btn btn-ghost btn-sm"
                    >
                      <Eye size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Swaps */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-earth-900">Recent Swaps</h2>
              <Link
                to="/swaps"
                className="btn btn-outline btn-sm"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="card-body">
            {recentSwaps.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-earth-300 mx-auto mb-4" />
                <p className="text-earth-600 mb-4">No swap activity yet</p>
                <Link to="/browse" className="btn btn-primary">
                  Browse Items
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSwaps.map((swap) => (
                  <div key={swap.id} className="flex items-center space-x-4 p-3 rounded-lg bg-earth-50">
                    <div className="w-12 h-12 bg-earth-200 rounded-lg flex items-center justify-center">
                      {getStatusIcon(swap.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-earth-900">{swap.itemTitle}</h3>
                      <p className="text-sm text-earth-600">{swap.date}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                      {swap.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <h2 className="text-xl font-semibold text-earth-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            key="upload"
            to="/upload"
            className="card hover:shadow-sustainable-lg transition-all duration-200 group"
          >
            <div className="card-body text-center">
              <Upload className="w-8 h-8 text-primary-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-earth-900">Upload Item</h3>
              <p className="text-sm text-earth-600">Share your clothes with the community</p>
            </div>
          </Link>
          
          <Link
            key="browse"
            to="/browse"
            className="card hover:shadow-sustainable-lg transition-all duration-200 group"
          >
            <div className="card-body text-center">
              <ShoppingBag className="w-8 h-8 text-secondary-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-earth-900">Browse Items</h3>
              <p className="text-sm text-earth-600">Discover sustainable fashion</p>
            </div>
          </Link>
          
          <Link
            key="swaps"
            to="/swaps"
            className="card hover:shadow-sustainable-lg transition-all duration-200 group"
          >
            <div className="card-body text-center">
              <Heart className="w-8 h-8 text-earth-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-earth-900">My Swaps</h3>
              <p className="text-sm text-earth-600">Manage your swap requests</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  )
} 