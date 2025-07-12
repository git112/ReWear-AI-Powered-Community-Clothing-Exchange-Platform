import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Leaf, 
  Recycle, 
  Globe, 
  Mail, 
  Twitter, 
  Instagram, 
  Facebook 
} from 'lucide-react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    platform: [
      { name: 'Browse Items', path: '/browse' },
      { name: 'How It Works', path: '/#how-it-works' },
      { name: 'Upload Item', path: '/upload' },
      { name: 'Points System', path: '/#points' },
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Contact Us', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    sustainability: [
      { name: 'Our Mission', path: '/mission' },
      { name: 'Environmental Impact', path: '/impact' },
      { name: 'Sustainability Tips', path: '/tips' },
      { name: 'Community Guidelines', path: '/guidelines' },
    ],
  }

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/rewear' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/rewear' },
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/rewear' },
    { name: 'Email', icon: Mail, url: 'mailto:hello@rewear.com' },
  ]

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-2xl"
              >
                ♻️
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">ReWear</h3>
                <p className="text-sm text-gray-300">Sustainable Fashion Exchange</p>
              </div>
            </Link>
            
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Join our community in making fashion sustainable. Swap, share, and reduce waste while building meaningful connections.
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sustainability Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Sustainability</h4>
            <ul className="space-y-2">
              {footerLinks.sustainability.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>&copy; {currentYear} ReWear. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart size={14} className="text-red-400" />
                <span>for the planet</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <Leaf size={14} className="text-green-400" />
                <span>Eco-friendly</span>
              </div>
              <div className="flex items-center space-x-1">
                <Recycle size={14} className="text-blue-400" />
                <span>Circular economy</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe size={14} className="text-purple-400" />
                <span>Global community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 p-6 bg-white/5 rounded-lg">
          <div className="text-center">
            <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-300 text-sm mb-4">
              Get the latest sustainability tips and community updates
            </p>
            <div className="flex max-w-md mx-auto space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 