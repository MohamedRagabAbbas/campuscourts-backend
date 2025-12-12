import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCalendar, FiClock, FiDollarSign } from 'react-icons/fi'

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fadeIn">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Book Your Favorite Sports Facility in{' '}
              <span className="text-primary-200">Seconds</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-100 mb-8">
              No more phone calls, no more waiting. Instant booking, transparent pricing, and real-time availability for all campus sports facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/facilities" className="bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg">
                <span>Browse Facilities</span>
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="bg-primary-500 hover:bg-primary-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center">
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <FiCalendar className="w-10 h-10 mb-4 text-primary-200" />
              <h3 className="text-xl font-semibold mb-2">Real-Time Availability</h3>
              <p className="text-primary-100">See what's available right now and book instantly</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <FiClock className="w-10 h-10 mb-4 text-primary-200" />
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-primary-100">Book anytime, anywhere from your mobile device</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <FiDollarSign className="w-10 h-10 mb-4 text-primary-200" />
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-primary-100">No hidden fees. Student-friendly rates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
