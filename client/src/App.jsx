import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { authAPI, bookingAPI } from './services/api'
import Home from './pages/Home'
import Facilities from './pages/Facilities'
import BookingPage from './pages/BookingPage'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState([])

  // Check if user is logged in on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')

    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser))
        fetchUserBookings()
      } catch (error) {
        console.error('Error restoring user session:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  // Fetch user's bookings from backend
  const fetchUserBookings = async () => {
    try {
      const response = await bookingAPI.getAll()
      setBookings(response.data.data || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  // Handle login - called from Login page
  const handleLogin = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password })
    const { user: userData, token } = response.data

    // Store in localStorage
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))

    setUser(userData)
    await fetchUserBookings()
    return { success: true }
  } catch (error) {
    console.log('Login error caught:', error.response) // ADD THIS DEBUG LINE
    return { 
      success: false, 
      error: error.response?.data?.message || 'Login failed. Please check your credentials.' 
    }
  }
}
  // Handle registration - called from Register page
  const handleRegister = async (name, email, password) => {
    try {
      const response = await authAPI.register({ name, email, password })
      const { user: userData, token } = response.data

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))

      setUser(userData)
      await fetchUserBookings()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      }
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setBookings([])
  }

  // Handle new booking - called from BookingPage
  const handleCreateBooking = async (bookingData) => {
    try {
      await bookingAPI.create(bookingData)
      await fetchUserBookings()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Booking failed' 
      }
    }
  }

  // Handle cancel booking - called from MyBookings
  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingAPI.delete(bookingId)
      await fetchUserBookings()
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Cancellation failed' 
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-4xl mb-4">🏀</div>
          <p className="text-gray-600">Loading CampusCourts...</p>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
        
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />} 
        />
        
        <Route 
          path="/register" 
          element={user ? <Navigate to="/" replace /> : <Register onRegister={handleRegister} />} 
        />

        {/* Protected Routes - require authentication */}
        <Route 
          path="/facilities" 
          element={
            <ProtectedRoute user={user} onLogout={handleLogout}>
              <Facilities user={user} />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/booking/:facilityId" 
          element={
            <ProtectedRoute user={user} onLogout={handleLogout}>
              <BookingPage 
                user={user} 
                onCreateBooking={handleCreateBooking}
              />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/my-bookings" 
          element={
            <ProtectedRoute user={user} onLogout={handleLogout}>
              <MyBookings 
                user={user}
                bookings={bookings}
                onCancelBooking={handleCancelBooking}
              />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute user={user} onLogout={handleLogout}>
              <Profile user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />

        {/* Redirect everything else to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App