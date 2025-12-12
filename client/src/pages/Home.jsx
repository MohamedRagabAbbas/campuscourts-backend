// src/pages/Home.jsx
import { Link, useNavigate } from 'react-router-dom'

function Home({ user, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md px-4 sm:px-6 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-3xl">🏀</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CampusCourts
            </h1>
          </div>

          <div className="flex gap-2 lg:gap-6 items-center">
            {user ? (
              <>
                <Link to="/facilities" className="px-4 py-2 rounded-lg hover:bg-gray-100">
                  Browse
                </Link>
                <Link to="/my-bookings" className="px-4 py-2 rounded-lg hover:bg-gray-100">
                  My Bookings
                </Link>
                <Link to="/profile" className="px-4 py-2 rounded-lg hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded-lg hover:bg-gray-100">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">Welcome to CampusCourts</h2>
        <p className="text-xl text-gray-600 mb-8">Book your favorite sports facilities and play with friends</p>
        
        {user ? (
          <Link
            to="/facilities"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 text-lg font-semibold"
          >
            Browse Facilities
          </Link>
        ) : (
          <Link
            to="/register"
            className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 text-lg font-semibold"
          >
            Get Started
          </Link>
        )}
      </div>
    </div>
  )
}

export default Home
