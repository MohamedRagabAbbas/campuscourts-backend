import React from 'react'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold">
                C
              </div>
              <span className="font-bold text-xl text-white">CampusCourts</span>
            </div>
            <p className="text-sm text-gray-400">
              Simplifying sports facility booking for university students. Book your favorite court in seconds.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                <FiInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary-500 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="hover:text-primary-500 transition-colors duration-200">
                  Facilities
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="hover:text-primary-500 transition-colors duration-200">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary-500 transition-colors duration-200">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-500 transition-colors duration-200">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <FiMapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>AUC New Cairo, Egypt</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="w-4 h-4" />
                <span>+20 10 1234 5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <FiMail className="w-4 h-4" />
                <span>support@campuscourts.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 CampusCourts. All rights reserved. Made with ❤️ by students, for students.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
