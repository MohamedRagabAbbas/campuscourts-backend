// src/pages/MyBookings.jsx
import { useState } from 'react'

function MyBookings({ user, bookings, onCancelBooking }) {
  const [cancelLoading, setCancelLoading] = useState(null)
  const [cancelError, setCancelError] = useState('')

  const handleCancel = async (bookingId) => {
    setCancelLoading(bookingId)
    setCancelError('')

    try {
      const result = await onCancelBooking(bookingId)
      if (!result.success) {
        setCancelError(result.error)
      }
    } finally {
      setCancelLoading(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

      {cancelError && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          {cancelError}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No bookings yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.sport}</h3>
              <p className="text-gray-600 mb-2">Facility: {booking.facility}</p>
              <p className="text-gray-600 mb-2">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">Time: {booking.timeSlot}</p>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {booking.status}
              </span>
              <button
                onClick={() => handleCancel(booking._id)}
                disabled={cancelLoading === booking._id}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {cancelLoading === booking._id ? 'Canceling...' : 'Cancel Booking'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings
