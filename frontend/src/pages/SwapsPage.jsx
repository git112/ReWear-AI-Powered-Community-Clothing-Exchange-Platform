import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Clock, 
  CheckCircle, 
  XCircle,
  MessageSquare,
  Filter,
  Search
} from 'lucide-react'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { toast } from 'react-hot-toast'

export const SwapsPage = () => {
  const [swaps, setSwaps] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchSwaps = async () => {
      try {
        setLoading(true)
        // Mock data - would come from swaps API
        setSwaps([
          {
            id: 1,
            itemTitle: 'Vintage Denim Jacket',
            requester: 'John Doe',
            owner: 'Jane Smith',
            status: 'pending',
            date: '2024-01-15',
            type: 'received'
          },
          {
            id: 2,
            itemTitle: 'Summer Dress',
            requester: 'You',
            owner: 'Bob Wilson',
            status: 'completed',
            date: '2024-01-10',
            type: 'sent'
          },
          {
            id: 3,
            itemTitle: 'Leather Boots',
            requester: 'Alice Johnson',
            owner: 'You',
            status: 'rejected',
            date: '2024-01-05',
            type: 'received'
          }
        ])
      } catch (error) {
        console.error('Error fetching swaps:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSwaps()
  }, [])

  const filteredSwaps = swaps.filter(swap => {
    const matchesSearch = swap.itemTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         swap.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         swap.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || swap.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
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

  const handleSwapAction = async (swapId, action) => {
    try {
      // Mock API call - would call actual API
      console.log(`Performing ${action} on swap ${swapId}`)
      toast.success(`Swap ${action} successfully!`)
      
      // Update local state
      setSwaps(prev => prev.map(swap => 
        swap.id === swapId 
          ? { ...swap, status: action === 'accept' ? 'completed' : 'rejected' }
          : swap
      ))
    } catch (error) {
      console.error('Swap action error:', error)
      toast.error(`Failed to ${action} swap`)
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
          My Swaps
        </h1>
        <p className="text-earth-600">
          Manage your swap requests and track your exchanges
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card mb-6"
      >
        <div className="card-body">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
              <input
                type="text"
                placeholder="Search swaps..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Swaps List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        {filteredSwaps.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-earth-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-earth-900 mb-2">No swaps found</h3>
            <p className="text-earth-600 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Start browsing items to make your first swap request!'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button className="btn btn-primary">
                Browse Items
              </button>
            )}
          </div>
        ) : (
          filteredSwaps.map((swap, index) => (
            <motion.div
              key={swap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card"
            >
              <div className="card-body">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-earth-100 rounded-lg flex items-center justify-center">
                      {getStatusIcon(swap.status)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-earth-900 mb-1">
                        {swap.itemTitle}
                      </h3>
                      <div className="text-sm text-earth-600 space-y-1">
                        <p>
                          <span className="font-medium">
                            {swap.type === 'sent' ? 'To: ' : 'From: '}
                          </span>
                          {swap.type === 'sent' ? swap.owner : swap.requester}
                        </p>
                        <p>
                          <span className="font-medium">Date: </span>
                          {new Date(swap.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(swap.status)}`}>
                      {swap.status}
                    </span>
                    
                    {/* Action Buttons */}
                    {swap.status === 'pending' && swap.type === 'received' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSwapAction(swap.id, 'accept')}
                          className="btn btn-success btn-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleSwapAction(swap.id, 'reject')}
                          className="btn btn-outline btn-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    
                    {swap.status === 'pending' && (
                      <button className="btn btn-ghost btn-sm">
                        <MessageSquare size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-earth-900">
                {swaps.filter(s => s.status === 'pending').length}
              </h3>
              <p className="text-sm text-earth-600">Pending Requests</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-earth-900">
                {swaps.filter(s => s.status === 'completed').length}
              </h3>
              <p className="text-sm text-earth-600">Completed Swaps</p>
            </div>
          </div>
          
          <div className="card">
            <div className="card-body text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-earth-900">
                {swaps.filter(s => s.status === 'rejected').length}
              </h3>
              <p className="text-sm text-earth-600">Rejected Requests</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 