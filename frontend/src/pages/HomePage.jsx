import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Leaf, 
  Users, 
  Heart, 
  Star, 
  Recycle, 
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import heroBg from '../assets/hero-bg.jpg'

export const HomePage = () => {
  const { isAuthenticated } = useAuth()

  const features = [
    {
      icon: Recycle,
      title: 'Circular Fashion',
      description: 'Give your clothes a second life and reduce fashion waste through our community-driven exchange platform.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Connect with like-minded individuals who share your passion for sustainable fashion and conscious consumption.'
    },
    {
      icon: Heart,
      title: 'Eco-Friendly',
      description: 'Every swap helps reduce the environmental impact of fast fashion and promotes a more sustainable lifestyle.'
    },
    {
      icon: TrendingUp,
      title: 'Points System',
      description: 'Earn points for uploads and spend them on items you love. A fair and engaging way to participate.'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Verified users, secure transactions, and community moderation ensure a safe swapping experience.'
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Browse, request, and complete swaps quickly with our streamlined and intuitive platform.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fashion Enthusiast',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'ReWear has completely changed how I think about fashion. I\'ve found amazing pieces and made great friends in the process!',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Sustainability Advocate',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      content: 'The points system is brilliant! It encourages participation and makes the whole experience feel like a game.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Student',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      content: 'As a student on a budget, ReWear has been a lifesaver. I can refresh my wardrobe without spending money!',
      rating: 5
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Items Swapped' },
    { number: '5,000+', label: 'Happy Users' },
    { number: '50,000+', label: 'Points Earned' },
    { number: '95%', label: 'Satisfaction Rate' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="hero relative overflow-hidden min-h-[600px] flex items-center"
        style={{
          background: 'none',
        }}
      >
        {/* Blurred background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt="Sustainable clothing background"
            className="w-full h-full object-cover object-center blur-[10px] scale-105 opacity-90"
            style={{ filter: 'blur(10px) brightness(0.92)' }}
          />
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="hero-content relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Headline, description, buttons */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white drop-shadow-lg">
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="block bg-gradient-to-r from-primary-200 via-secondary-200 to-primary-400 bg-clip-text text-transparent animate-fade-in"
                >
                  Sustainable Fashion
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="block bg-gradient-to-r from-secondary-200 via-primary-100 to-secondary-400 bg-clip-text text-transparent animate-fade-in"
                >
                  for Everyone
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-white/90 mb-8 leading-relaxed animate-fade-in drop-shadow"
              >
                Join our community-driven clothing exchange platform. Swap, share, and reduce waste while building meaningful connections with fellow fashion enthusiasts.
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link
                    to="/browse"
                    className="btn btn-secondary btn-lg group hover:scale-105 hover:shadow-sustainable-xl transition-transform duration-200 focus:ring-4 focus:ring-primary-300"
                  >
                    Start Browsing
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="btn btn-secondary btn-lg group hover:scale-105 hover:shadow-sustainable-xl transition-transform duration-200 focus:ring-4 focus:ring-primary-300"
                    >
                      Join the Community
                      <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/browse"
                      className="btn btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-600 hover:scale-105 hover:shadow-sustainable-xl transition-transform duration-200 focus:ring-4 focus:ring-primary-300"
                    >
                      Browse Items
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
            {/* Right: How It Works card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center items-center"
            >
              <div className="glass shadow-2xl rounded-2xl p-10 border border-white/30 backdrop-blur-xl bg-white/20 max-w-md w-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">♻️</div>
                  <h3 className="text-2xl font-bold text-white mb-2">How It Works</h3>
                  <div className="space-y-4 text-white/90">
                    <div className="flex items-center space-x-3 justify-center">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                      <span>Upload your unused clothes</span>
                    </div>
                    <div className="flex items-center space-x-3 justify-center">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                      <span>Earn points for each upload</span>
                    </div>
                    <div className="flex items-center space-x-3 justify-center">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                      <span>Request items you love</span>
                    </div>
                    <div className="flex items-center space-x-3 justify-center">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                      <span>Complete swaps and connect</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container-responsive">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="stat-item"
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-earth-900 mb-4">
              Why Choose ReWear?
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto">
              Our platform combines the best of community, sustainability, and technology to create a unique fashion exchange experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon size={32} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-earth-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-earth-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container-responsive">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-earth-900 mb-4">
              What Our Community Says
            </h2>
            <p className="text-xl text-earth-600 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their relationship with fashion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="testimonial-card"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-earth-900">{testimonial.name}</h4>
                    <p className="text-sm text-earth-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-earth-700 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container-responsive text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-earth-900 mb-4">
              Ready to Start Your Sustainable Fashion Journey?
            </h2>
            <p className="text-xl text-earth-600 mb-8 max-w-2xl mx-auto">
              Join thousands of fashion enthusiasts who are making a difference, one swap at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to="/upload"
                  className="btn btn-primary btn-lg group hover:scale-105 hover:shadow-sustainable-xl transition-transform duration-200 focus:ring-4 focus:ring-primary-300"
                >
                  Upload Your First Item
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="btn btn-primary btn-lg group hover:scale-105 hover:shadow-sustainable-xl transition-transform duration-200 focus:ring-4 focus:ring-primary-300"
                  >
                    Get Started Free
                    <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/browse"
                    className="btn btn-outline btn-lg hover:scale-105 hover:shadow-sustainable-xl transition-transform duration-200 focus:ring-4 focus:ring-primary-300"
                  >
                    Explore Items
                  </Link>
                </>
              )}
            </div>
            <p className="text-sm text-earth-500 mt-4">
              No credit card required • Join 5,000+ members
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 