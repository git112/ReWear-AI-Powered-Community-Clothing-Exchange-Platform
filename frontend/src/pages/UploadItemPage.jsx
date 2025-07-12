import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  X, 
  Image as ImageIcon,
  Tag,
  Ruler,
  Star,
  ArrowLeft
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { itemsAPI } from '../services/api'
import { toast } from 'react-hot-toast'

const uploadSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  size: z.string().min(1, 'Please select a size'),
  condition: z.string().min(1, 'Please select a condition'),
  tags: z.string().optional()
})

export const UploadItemPage = () => {
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(uploadSchema)
  })

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }))
    setImages(prev => [...prev, ...newImages].slice(0, 5)) // Max 5 images
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    maxFiles: 5
  })

  const removeImage = (index) => {
    setImages(prev => {
      const newImages = prev.filter((_, i) => i !== index)
      return newImages
    })
  }

  const onSubmit = async (data) => {
    if (images.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    setUploading(true)
    try {
      // Create FormData for image upload
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('category', data.category)
      formData.append('size', data.size)
      formData.append('condition', data.condition)
      if (data.tags) {
        formData.append('tags', data.tags)
      }

      // Append images
      images.forEach((image, index) => {
        formData.append('images', image.file)
      })

      const response = await itemsAPI.createItem(formData)
      
      toast.success('Item uploaded successfully!')
      navigate(`/items/${response.data.data.id}`)
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error.response?.data?.message || 'Failed to upload item')
    } finally {
      setUploading(false)
    }
  }

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'tops', label: 'Tops' },
    { value: 'bottoms', label: 'Bottoms' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'shoes', label: 'Shoes' },
    { value: 'accessories', label: 'Accessories' }
  ]

  const sizes = [
    { value: '', label: 'Select Size' },
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ]

  const conditions = [
    { value: '', label: 'Select Condition' },
    { value: 'new', label: 'New with tags' },
    { value: 'like-new', label: 'Like new' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' }
  ]

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Link
          to="/dashboard"
          className="inline-flex items-center text-earth-600 hover:text-primary-600 mb-4 transition-colors duration-200"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-earth-900 mb-2">
          Upload Your Item
        </h1>
        <p className="text-earth-600">
          Share your clothes with the community and earn points
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="text-xl font-semibold text-earth-900">Item Photos</h2>
            <p className="text-sm text-earth-600">Upload up to 5 high-quality images</p>
          </div>
          <div className="card-body">
            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-earth-300 hover:border-primary-400 hover:bg-earth-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-earth-400 mx-auto mb-4" />
              {isDragActive ? (
                <p className="text-primary-600 font-medium">Drop the images here...</p>
              ) : (
                <div>
                  <p className="text-earth-600 font-medium mb-2">
                    Drag & drop images here, or click to select
                  </p>
                  <p className="text-sm text-earth-500">
                    PNG, JPG, WEBP up to 5MB each
                  </p>
                </div>
              )}
            </div>

            {/* Image Preview */}
            {images.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-earth-700 mb-3">
                  Preview ({images.length}/5)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Item Details Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="text-xl font-semibold text-earth-900">Item Details</h2>
            <p className="text-sm text-earth-600">Tell us about your item</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-earth-700 mb-2">
                  Item Title *
                </label>
                <input
                  {...register('title')}
                  type="text"
                  id="title"
                  className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Vintage Denim Jacket"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-earth-700 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description')}
                  id="description"
                  rows={4}
                  className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Describe your item, including brand, material, and any unique features..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              {/* Category and Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-earth-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category')}
                    id="category"
                    className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-earth-700 mb-2">
                    Size *
                  </label>
                  <select
                    {...register('size')}
                    id="size"
                    className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  >
                    {sizes.map(size => (
                      <option key={size.value} value={size.value}>
                        {size.label}
                      </option>
                    ))}
                  </select>
                  {errors.size && (
                    <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>
                  )}
                </div>
              </div>

              {/* Condition */}
              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-earth-700 mb-2">
                  Condition *
                </label>
                <select
                  {...register('condition')}
                  id="condition"
                  className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                >
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  ))}
                </select>
                {errors.condition && (
                  <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-earth-700 mb-2">
                  Tags (Optional)
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
                  <input
                    {...register('tags')}
                    type="text"
                    id="tags"
                    className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                    placeholder="vintage, denim, casual, sustainable"
                  />
                </div>
                <p className="mt-1 text-xs text-earth-500">
                  Separate tags with commas to help others find your item
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading}
                className="w-full btn btn-primary btn-lg"
              >
                {uploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </div>
                ) : (
                  <>
                    <Upload size={20} className="mr-2" />
                    Upload Item
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <div className="card bg-primary-50 border-primary-200">
          <div className="card-body">
            <h3 className="text-lg font-semibold text-primary-900 mb-3">
              💡 Tips for Better Listings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-800">
              <div>
                <h4 className="font-medium mb-2">📸 Photos</h4>
                <ul className="space-y-1">
                  <li>• Use natural lighting</li>
                  <li>• Show item from multiple angles</li>
                  <li>• Include close-ups of any flaws</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📝 Description</h4>
                <ul className="space-y-1">
                  <li>• Be honest about condition</li>
                  <li>• Mention brand and material</li>
                  <li>• Include measurements if helpful</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 