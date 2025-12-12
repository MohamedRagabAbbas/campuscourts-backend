import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('=== LOGIN ATTEMPT ===')
    console.log('Email:', email)
    
    setError('') // Clear previous error
    setLoading(true)

    try {
      console.log('Calling onLogin...')
      const result = await onLogin(email, password)
      console.log('Result received:', result)
      
      if (result.success) {
        console.log('✅ Login successful!')
        navigate('/')
      } else {
        console.log('❌ Login failed:', result.error)
        setError(result.error || 'Invalid email or password')
        alert('Login Failed: ' + (result.error || 'Invalid email or password')) // TEMP ALERT
      }
    } catch (err) {
      console.error('❌ Exception:', err)
      setError('Unable to connect. Please try again.')
      alert('Error: Unable to connect') // TEMP ALERT
    } finally {
      setLoading(false)
      console.log('=== LOGIN ATTEMPT END ===')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <div className="text-5xl text-center mb-2">🏀</div>
        <h1 className="text-3xl font-bold text-gray-900 text-center">CampusCourts</h1>
        <p className="text-gray-600 text-center mb-6">Book Your Game, Play Your Way</p>

        {/* ERROR MESSAGE BOX */}
        {error && (
          <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-4 animate-pulse">
            <div className="flex items-center">
              <span className="text-2xl mr-2">⚠️</span>
              <div>
                <strong className="font-bold">Login Failed!</strong>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Student Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 font-semibold"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

        {/* DEBUG INFO */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Error state: {error ? 'YES' : 'NO'}
        </div>
      </div>
    </div>
  )
}

export default Login
