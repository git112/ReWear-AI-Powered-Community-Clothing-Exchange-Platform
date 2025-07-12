import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Users, 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  AlertTriangle,
  Shield,
  BarChart3,
  Settings
} from 'lucide-react'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

export const AdminDashboardPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalItems: 0,
    totalSwaps: 0,
    pendingReports: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        setLoading(true)
        // Mock data - would come from admin API
        setStats({
          totalUsers: 1250,
          totalItems: 3420,
          totalSwaps: 890,
          pendingReports: 12
        })
      } catch (error) {
        console.error('Error fetching admin stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminStats()
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'primary',
      description: 'Registered community members'
    },
    {
      title: 'Total Items',
      value: stats.totalItems,
      icon: ShoppingBag,
      color: 'secondary',
      description: 'Items uploaded to platform'
    },
    {
      title: 'Total Swaps',
      value: stats.totalSwaps,
      icon: Heart,
      color: 'success',
      description: 'Successful exchanges'
    },
    {
      title: 'Pending Reports',
      value: stats.pendingReports,
      icon: AlertTriangle,
      color: 'warning',
      description: 'Items requiring review'
    }
  ]

  const quickActions = [
    {
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: Users,
      link: '/admin/users',
      color: 'primary'
    },
    {
      title: 'Content Moderation',
      description: 'Review reported items and users',
      icon: Shield,
      link: '/admin/items',
      color: 'secondary'
    },
    {
      title: 'Analytics',
      description: 'View platform statistics and trends',
      icon: BarChart3,
      link: '/admin/analytics',
      color: 'success'
    },
    {
      title: 'Settings',
      description: 'Configure platform settings',
      icon: Settings,
      link: '/admin/settings',
      color: 'warning'
    }
  ]

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
          Admin Dashboard
        </h1>
        <p className="text-earth-600">
          Manage the ReWear platform and community
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
                  <p className="text-2xl font-bold text-earth-900">{stat.value.toLocaleString()}</p>
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-xl font-semibold text-earth-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              to={action.link}
              className="card hover:shadow-sustainable-lg transition-all duration-200 group"
            >
              <div className="card-body text-center">
                <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-6 h-6 text-${action.color}-600`} />
                </div>
                <h3 className="font-medium text-earth-900 mb-1">{action.title}</h3>
                <p className="text-sm text-earth-600">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Recent Users */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-earth-900">Recent Users</h3>
            <Link to="/admin/users" className="btn btn-outline btn-sm">
              View All
            </Link>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-earth-50">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-earth-900">User {i}</p>
                    <p className="text-sm text-earth-600">Joined 2 days ago</p>
                  </div>
                  <span className="text-xs text-earth-500">Active</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-earth-900">Recent Reports</h3>
            <Link to="/admin/items" className="btn btn-outline btn-sm">
              View All
            </Link>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3 p-3 rounded-lg bg-earth-50">
                  <div className="w-10 h-10 bg-warning-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-warning-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-earth-900">Report #{i}</p>
                    <p className="text-sm text-earth-600">Item reported for inappropriate content</p>
                  </div>
                  <span className="text-xs text-warning-600">Pending</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <div className="card bg-green-50 border-green-200">
          <div className="card-body">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-green-900">System Status: Healthy</h3>
                <p className="text-sm text-green-700">All systems are running normally</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 