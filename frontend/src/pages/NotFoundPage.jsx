import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Search, ArrowLeft } from 'lucide-react'

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-sustainable flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        {/* 404 Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          ♻️
        </motion.div>

        {/* Error Message */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-6xl font-bold text-gradient mb-4"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl font-semibold text-earth-900 mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-earth-600 mb-8"
        >
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <Link
            to="/"
            className="btn btn-primary btn-lg w-full group"
          >
            <Home size={20} className="mr-2 group-hover:scale-110 transition-transform" />
            Go Home
          </Link>

          <Link
            to="/browse"
            className="btn btn-outline btn-lg w-full group"
          >
            <Search size={20} className="mr-2 group-hover:scale-110 transition-transform" />
            Browse Items
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost w-full group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </motion.div>

        {/* Help Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-sm text-earth-500 mt-8"
        >
          Need help? <Link to="/contact" className="text-primary-600 hover:underline">Contact us</Link>
        </motion.p>
      </motion.div>
    </div>
  )
} 