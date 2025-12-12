import { useState } from 'react'
import { Link } from 'react-router-dom'

function Facilities({ user }) {
  const facilities = [
    { id: 1, name: 'Basketball Court A', sport: 'Basketball', description: 'Main basketball court with professional setup' },
    { id: 2, name: 'Tennis Court 1', sport: 'Tennis', description: 'Indoor tennis court with quality equipment' },
    { id: 3, name: 'Football Field', sport: 'Football', description: 'Full size outdoor football field' },
    { id: 4, name: 'Swimming Pool', sport: 'Swimming', description: 'Olympic size swimming pool' },
    { id: 5, name: 'Badminton Court', sport: 'Badminton', description: 'Professional badminton courts' },
    { id: 6, name: 'Volleyball Court', sport: 'Volleyball', description: 'Indoor volleyball court with net' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Facilities</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="text-4xl mb-3">🏛️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
            <p className="text-gray-600 mb-2">Sport: {facility.sport}</p>
            <p className="text-gray-600 mb-4">{facility.description}</p>
            <Link
              to={`/booking/${facility.id}`}
              className="inline-block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Facilities
