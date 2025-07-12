import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Heart, 
  Eye,
  ShoppingBag,
  Star,
  MapPin
} from 'lucide-react'
import { itemsAPI } from '../services/api'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'

export const BrowsePage = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSize, setSelectedSize] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [filters, setFilters] = useState({
    category: 'all',
    size: 'all',
    condition: 'all',
    priceRange: 'all'
  })

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' }
  ]

  const sizes = [
    { value: 'all', label: 'All Sizes' },
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' }
  ]

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true)
        const response = await itemsAPI.getAll()
        console.log('API Response:', response.data)
        // Handle both old and new response structures
        const itemsData = response.data.data?.items || response.data.data || response.data || []
        setItems(Array.isArray(itemsData) ? itemsData : [])
      } catch (error) {
        console.error('Error fetching items:', error)
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  const filteredItems = Array.isArray(items) ? items.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filters.category === 'all' || item.category === filters.category
    const matchesSize = filters.size === 'all' || item.size === filters.size
    
    return matchesSearch && matchesCategory && matchesSize
  }) : []

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.created_at) - new Date(a.created_at)
      case 'oldest':
        return new Date(a.created_at) - new Date(b.created_at)
      case 'name':
        return a.title.localeCompare(b.title)
      case 'name-desc':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
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
          Browse Sustainable Fashion
        </h1>
        <p className="text-earth-600">
          Discover unique pieces and give them a second life
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Size Filter */}
            <select
              value={filters.size}
              onChange={(e) => handleFilterChange('size', e.target.value)}
              className="px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sizes.map(size => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-earth-200">
            <p className="text-sm text-earth-600">
              {sortedItems.length} items found
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-earth-400 hover:text-earth-600'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-earth-400 hover:text-earth-600'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Items Grid/List */}
      {sortedItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <ShoppingBag className="w-16 h-16 text-earth-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-earth-900 mb-2">No items found</h3>
          <p className="text-earth-600 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchTerm('')
              setFilters({ category: 'all', size: 'all', condition: 'all', priceRange: 'all' })
            }}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {sortedItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={viewMode === 'grid' ? 'card group' : 'card group flex'}
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Item Image */}
                  <div className="relative h-48 bg-earth-100 rounded-t-lg overflow-hidden">
                    {item.image_urls && item.image_urls[0] ? (
                      <img
                        src={item.image_urls[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-12 h-12 text-earth-300" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <button className="p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart size={16} className="text-earth-600" />
                      </button>
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="card-body">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-earth-900 group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-sm text-earth-500">{item.size}</span>
                    </div>
                    <p className="text-sm text-earth-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-earth-500">{item.category}</span>
                      <Link
                        to={`/items/${item.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <Eye size={16} className="mr-1" />
                        View
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* List View Image */}
                  <div className="relative w-24 h-24 bg-earth-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image_urls && item.image_urls[0] ? (
                      <img
                        src={item.image_urls[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8 text-earth-300" />
                      </div>
                    )}
                  </div>

                  {/* List View Details */}
                  <div className="flex-1 ml-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-earth-900 group-hover:text-primary-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-earth-600 mt-1">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-earth-500">{item.size}</span>
                        <button className="p-2 text-earth-400 hover:text-earth-600 transition-colors">
                          <Heart size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-earth-500">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.condition}</span>
                      </div>
                      <Link
                        to={`/items/${item.id}`}
                        className="btn btn-primary btn-sm"
                      >
                        <Eye size={16} className="mr-1" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
} 