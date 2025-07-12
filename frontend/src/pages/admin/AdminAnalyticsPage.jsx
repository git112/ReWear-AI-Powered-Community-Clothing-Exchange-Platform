import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Heart,
  Calendar
} from 'lucide-react'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

export const AdminAnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({
    userGrowth: [],
    itemUploads: [],
    swapActivity: [],
    topCategories: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true)
        // Mock data - would come from admin API
        setAnalytics({
          userGrowth: [
            { month: 'Jan', users: 120 },
            { month: 'Feb', users: 180 },
            { month: 'Mar', users: 250 },
            { month: 'Apr', users: 320 },
            { month: 'May', users: 400 },
            { month: 'Jun', users: 480 }
          ],
          itemUploads: [
            { month: 'Jan', items: 45 },
            { month: 'Feb', items: 78 },
            { month: 'Mar', items: 120 },
            { month: 'Apr', items: 156 },
            { month: 'May', items: 200 },
            { month: 'Jun', items: 245 }
          ],
          swapActivity: [
            { month: 'Jan', swaps: 12 },
            { month: 'Feb', swaps: 25 },
            { month: 'Mar', swaps: 38 },
            { month: 'Apr', swaps: 52 },
            { month: 'May', swaps: 67 },
            { month: 'Jun', swaps: 83 }
          ],
          topCategories: [
            { category: 'Tops', count: 450, percentage: 35 },
            { category: 'Bottoms', count: 320, percentage: 25 },
            { category: 'Dresses', count: 280, percentage: 22 },
            { category: 'Outerwear', count: 180, percentage: 14 },
            { category: 'Shoes', count: 80, percentage: 4 }
          ]
        })
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

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
          Analytics & Insights
        </h1>
        <p className="text-earth-600">
          Platform performance and user engagement metrics
        </p>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Total Users</p>
                <p className="text-2xl font-bold text-earth-900">1,250</p>
                <p className="text-xs text-green-600 mt-1">+12% this month</p>
              </div>
              <div className="p-3 rounded-lg bg-primary-100">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Total Items</p>
                <p className="text-2xl font-bold text-earth-900">3,420</p>
                <p className="text-xs text-green-600 mt-1">+8% this month</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary-100">
                <ShoppingBag className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Total Swaps</p>
                <p className="text-2xl font-bold text-earth-900">890</p>
                <p className="text-xs text-green-600 mt-1">+15% this month</p>
              </div>
              <div className="p-3 rounded-lg bg-success-100">
                <Heart className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-earth-600">Active Rate</p>
                <p className="text-2xl font-bold text-earth-900">78%</p>
                <p className="text-xs text-green-600 mt-1">+5% this month</p>
              </div>
              <div className="p-3 rounded-lg bg-warning-100">
                <TrendingUp className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="card-header">
            <h3 className="text-lg font-semibold text-earth-900">User Growth</h3>
          </div>
          <div className="card-body">
            <div className="h-64 flex items-end justify-between space-x-2">
              {analytics.userGrowth.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-primary-500 rounded-t transition-all duration-300 hover:bg-primary-600"
                    style={{ height: `${(data.users / 500) * 200}px` }}
                  />
                  <span className="text-xs text-earth-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Item Uploads Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <div className="card-header">
            <h3 className="text-lg font-semibold text-earth-900">Item Uploads</h3>
          </div>
          <div className="card-body">
            <div className="h-64 flex items-end justify-between space-x-2">
              {analytics.itemUploads.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-secondary-500 rounded-t transition-all duration-300 hover:bg-secondary-600"
                    style={{ height: `${(data.items / 300) * 200}px` }}
                  />
                  <span className="text-xs text-earth-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card"
      >
        <div className="card-header">
          <h3 className="text-lg font-semibold text-earth-900">Top Categories</h3>
        </div>
        <div className="card-body">
          <div className="space-y-4">
            {analytics.topCategories.map((category, index) => (
              <div key={category.category} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-earth-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-earth-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-earth-900">{category.category}</span>
                    <span className="text-sm text-earth-600">{category.count} items</span>
                  </div>
                  <div className="w-full bg-earth-200 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-8"
      >
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-earth-900">Recent Activity</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {[
                { action: 'New user registered', time: '2 minutes ago', icon: Users },
                { action: 'Item uploaded', time: '5 minutes ago', icon: ShoppingBag },
                { action: 'Swap completed', time: '10 minutes ago', icon: Heart },
                { action: 'User reported item', time: '15 minutes ago', icon: Calendar }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-earth-50">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-earth-900">{activity.action}</p>
                    <p className="text-xs text-earth-600">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 