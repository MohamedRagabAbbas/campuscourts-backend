import React from 'react'
import { FiUsers, FiCalendar, FiTrendingUp, FiAward } from 'react-icons/fi'

const Stats = () => {
  const stats = [
    { icon: FiUsers, value: '2,500+', label: 'Active Users', color: 'text-blue-600' },
    { icon: FiCalendar, value: '10,000+', label: 'Bookings Made', color: 'text-green-600' },
    { icon: FiTrendingUp, value: '95%', label: 'Satisfaction Rate', color: 'text-purple-600' },
    { icon: FiAward, value: '15+', label: 'Sports Facilities', color: 'text-orange-600' },
  ]

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Students Across Campus
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who have made booking sports facilities effortless
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 text-center shadow-card hover:shadow-card-hover transition-all duration-300">
              <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Stats
