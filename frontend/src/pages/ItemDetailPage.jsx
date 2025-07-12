import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Share2, 
  User, 
  MapPin, 
  Calendar,
  Tag,
  Ruler,
  Star,
  MessageSquare,
  ArrowLeft,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { itemsAPI, swapsAPI } from '../services/api'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { toast } from 'react-hot-toast'

export const ItemDetailPage = () => {
  const { id } = useParams()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showSwapModal, setShowSwapModal] = useState(false)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true)
        const response = await itemsAPI.getItem(id)
        setItem(response.data.data)
      } catch (error) {
        console.error('Error fetching item:', error)
        toast.error('Failed to load item details')
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id])

  const handleSwapRequest = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to request this item')
      navigate('/login', { state: { from: `/items/${id}` } })
      return
    }

    if (item.user_id === user?.id) {
      toast.error('You cannot request your own item')
      return
    }

    setRequesting(true)
    try {
      await swapsAPI.requestSwap(item.id)
      toast.success('Swap request sent successfully!')
      setShowSwapModal(false)
      // Refresh item data to update status
      const response = await itemsAPI.getItem(id)
      setItem(response.data.data)
    } catch (error) {
      console.error('Error requesting swap:', error)
      toast.error(error.response?.data?.message || 'Failed to request swap')
    } finally {
      setRequesting(false)
    }
  }

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'new':
        return 'text-green-600 bg-green-50'
      case 'like-new':
        return 'text-blue-600 bg-blue-50'
      case 'excellent':
        return 'text-purple-600 bg-purple-50'
      case 'good':
        return 'text-yellow-600 bg-yellow-50'
      case 'fair':
        return 'text-orange-600 bg-orange-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getConditionLabel = (condition) => {
    switch (condition) {
      case 'new':
        return 'New with tags'
      case 'like-new':
        return 'Like new'
      case 'excellent':
        return 'Excellent'
      case 'good':
        return 'Good'
      case 'fair':
        return 'Fair'
      default:
        return condition
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container-responsive py-8 text-center">
        <h1 className="text-2xl font-bold text-earth-900 mb-4">Item not found</h1>
        <Link to="/browse" className="btn btn-primary">
          Browse Items
        </Link>
      </div>
    )
  }

  return (
    <div className="container-responsive py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Link
          to="/browse"
          className="inline-flex items-center text-earth-600 hover:text-primary-600 transition-colors duration-200"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Browse
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="relative aspect-square bg-earth-100 rounded-lg overflow-hidden">
            {item.image_urls && item.image_urls[currentImageIndex] ? (
              <img
                src={item.image_urls[currentImageIndex]}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Tag className="w-16 h-16 text-earth-300" />
              </div>
            )}
            
            {/* Image Navigation */}
            {item.image_urls && item.image_urls.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev > 0 ? prev - 1 : item.image_urls.length - 1)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => prev < item.image_urls.length - 1 ? prev + 1 : 0)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Images */}
          {item.image_urls && item.image_urls.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {item.image_urls.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    index === currentImageIndex
                      ? 'border-primary-500'
                      : 'border-earth-200 hover:border-earth-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Item Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold text-earth-900">{item.title}</h1>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-earth-400 hover:text-earth-600 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-2 text-earth-400 hover:text-earth-600 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
            <p className="text-lg text-earth-600">{item.description}</p>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(item.condition)}`}>
              {getConditionLabel(item.condition)}
            </span>
            <span className="text-sm text-earth-500">Size: {item.size?.toUpperCase()}</span>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-earth-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-earth-100 text-earth-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Owner Information */}
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-earth-900 mb-3">Listed by</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-earth-900">{item.owner?.name || 'Anonymous'}</p>
                  <p className="text-sm text-earth-600">Member since {new Date(item.owner?.created_at).getFullYear()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Swap Request Button */}
          <div className="space-y-4">
            {item.user_id === user?.id ? (
              <div className="text-center p-4 bg-earth-50 rounded-lg">
                <p className="text-earth-600">This is your item</p>
                <Link to="/dashboard" className="btn btn-outline mt-2">
                  Manage Your Items
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setShowSwapModal(true)}
                disabled={requesting}
                className="w-full btn btn-primary btn-lg"
              >
                {requesting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Requesting...
                  </div>
                ) : (
                  <>
                    <MessageSquare size={20} className="mr-2" />
                    Request Swap
                  </>
                )}
              </button>
            )}
          </div>

          {/* Additional Info */}
          <div className="space-y-3 text-sm text-earth-600">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Listed {new Date(item.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Tag size={16} />
              <span>Category: {item.category}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Swap Request Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-semibold text-earth-900 mb-4">
              Request Swap
            </h3>
            <p className="text-earth-600 mb-6">
              You're requesting to swap for "{item.title}". The owner will be notified and can accept or decline your request.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowSwapModal(false)}
                className="flex-1 btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleSwapRequest}
                disabled={requesting}
                className="flex-1 btn btn-primary"
              >
                {requesting ? 'Requesting...' : 'Send Request'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
} 