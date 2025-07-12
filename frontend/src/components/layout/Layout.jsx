import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from './Navigation'
import { Footer } from './Footer'
import { AnimatedBackground } from './AnimatedBackground'

export const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-sustainable flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">♻️</div>
          <h1 className="text-3xl font-bold text-gradient mb-2">ReWear</h1>
          <p className="text-earth-600">Loading sustainable fashion...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-earth-50">
      <AnimatedBackground />
      
      <Navigation />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
} 