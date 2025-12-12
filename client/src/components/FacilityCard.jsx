import React from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiUsers, FiClock, FiDollarSign } from 'react-icons/fi'

const FacilityCard = ({ facility }) => {
  return (
    <div className="card overflow-hidden group">
      <div className="relative overflow-hidden h-48">
        <img
          src={facility.image}
          alt={facility.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            facility.available 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {facility.available ? 'Available' : 'Booked'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900">{facility.name}</h3>
          <div className="text-primary-600 font-bold text-lg">
            ${facility.price}/hr
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{facility.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{facility.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FiUsers className="w-4 h-4 mr-2 text-gray-400" />
            <span>Capacity: {facility.capacity} people</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <FiClock className="w-4 h-4 mr-2 text-gray-400" />
            <span>Open: {facility.openHours}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {facility.amenities?.slice(0, 3).map((amenity, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              {amenity}
            </span>
          ))}
        </div>

        <Link
          to={`/booking/${facility.id}`}
          className="block w-full text-center btn-primary"
        >
          Book Now
        </Link>
      </div>
    </div>
  )
}

export default FacilityCard
