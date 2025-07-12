import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  User, 
  Mail, 
  Lock, 
  Save,
  Edit,
  Camera,
  Settings,
  Shield,
  Bell
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { toast } from 'react-hot-toast'

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().optional()
})

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || ''
    }
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || ''
      })
    }
  }, [user, reset])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await updateProfile(data)
      setIsEditing(false)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Profile update error:', error)
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
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
          Profile Settings
        </h1>
        <p className="text-earth-600">
          Manage your account and preferences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-earth-900">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn btn-outline btn-sm"
                >
                  <Edit size={16} className="mr-1" />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-10 h-10 text-primary-600" />
                    </div>
                    <button
                      type="button"
                      className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                    >
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900">{user.name}</h3>
                    <p className="text-sm text-earth-600">Member since {new Date(user.created_at).getFullYear()}</p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-earth-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:bg-earth-50 disabled:cursor-not-allowed"
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-earth-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      disabled={!isEditing}
                      className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 disabled:bg-earth-50 disabled:cursor-not-allowed"
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-earth-700 mb-2">
                    Bio (Optional)
                  </label>
                  <textarea
                    {...register('bio')}
                    id="bio"
                    rows={4}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none disabled:bg-earth-50 disabled:cursor-not-allowed"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Submit Button */}
                {isEditing && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      <>
                        <Save size={20} className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Stats Card */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-earth-900">Your Stats</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-earth-600">Points Earned</span>
                  <span className="font-semibold text-earth-900">{user.points || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-earth-600">Items Uploaded</span>
                  <span className="font-semibold text-earth-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-earth-600">Swaps Completed</span>
                  <span className="font-semibold text-earth-900">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-earth-600">Member Since</span>
                  <span className="font-semibold text-earth-900">{new Date(user.created_at).getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-earth-900">Quick Actions</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="w-full btn btn-outline btn-sm justify-start">
                  <Settings size={16} className="mr-2" />
                  Account Settings
                </button>
                <button className="w-full btn btn-outline btn-sm justify-start">
                  <Shield size={16} className="mr-2" />
                  Privacy & Security
                </button>
                <button className="w-full btn btn-outline btn-sm justify-start">
                  <Bell size={16} className="mr-2" />
                  Notification Preferences
                </button>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="card bg-green-50 border-green-200">
            <div className="card-body">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-900">Account Verified</h3>
                  <p className="text-sm text-green-700">Your account is active and verified</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 