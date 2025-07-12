import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  Search, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'

export const AdminItemsPage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        // Mock data - would come from admin API
        setItems([
          { 
            id: 1, 
            title: 'Vintage Denim Jacket', 
            owner: 'John Doe',
            status: 'reported',
            reports: 2,
            created: '2024-01-15'
          },
          { 
            id: 2, 
            title: 'Summer Dress', 
            owner: 'Jane Smith',
            status: 'approved',
            reports: 0,
            created: '2024-01-10'
          },
          { 
            id: 3, 
            title: 'Leather Boots', 
            owner: 'Bob Wilson',
            status: 'pending',
            reports: 1,
            created: '2024-01-05'
          },
        ])
      } catch (error) {
        console.error('Error fetching items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.owner.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50'
      case 'reported':
        return 'text-red-600 bg-red-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
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
          Content Moderation
        </h1>
        <p className="text-earth-600">
          Review and manage reported items
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
                placeholder="Search items..."
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
              <option value="pending">Pending Review</option>
              <option value="reported">Reported</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Items Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card"
      >
        <div className="card-header">
          <h2 className="text-xl font-semibold text-earth-900">
            Items ({filteredItems.length})
          </h2>
        </div>
        <div className="card-body p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-earth-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                    Reports
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-earth-200">
                {filteredItems.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-earth-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-secondary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-earth-900">{item.title}</div>
                          <div className="text-sm text-earth-500">ID: {item.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-900">
                      {item.owner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-900">
                      {item.reports}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-500">
                      {new Date(item.created).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-earth-400 hover:text-earth-600 transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 text-green-400 hover:text-green-600 transition-colors">
                          <CheckCircle size={16} />
                        </button>
                        <button className="p-1 text-red-400 hover:text-red-600 transition-colors">
                          <XCircle size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 