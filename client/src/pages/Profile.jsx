import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../services/api'

function Profile({ user, onLogout }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
  setLoading(true)
  try {
    // Call backend API to update in database
    const response = await userAPI.updateProfile({ name: formData.name })
    
    // Update localStorage with new data
    const updatedUser = response.data.user
    localStorage.setItem('user', JSON.stringify(updatedUser))
    
    alert('Profile updated successfully!')
    setIsEditing(false)
    window.location.reload()
  } catch (error) {
    alert(error.response?.data?.message || 'Failed to update profile')
  } finally {
    setLoading(false)
  }
}
  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || ''
    })
    setIsEditing(false)
  }

  const handleLogout = () => {
    onLogout()
    navigate('/login')
  }

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-8">
          <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold mx-auto mb-4">
            {user.name?.[0]?.toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-blue-100">Student Account</p>
        </div>

        {/* Personal Information */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                ✏️ Edit
              </button>
            ) : (
              <button
                onClick={handleCancel}
                className="text-red-600 hover:text-red-700 font-medium text-sm"
              >
                ❌ Cancel
              </button>
            )}
          </div>

          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              👤 Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg ${
                isEditing 
                  ? 'border-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                  : 'bg-gray-50 border-gray-300 cursor-not-allowed'
              }`}
            />
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📧 Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
            />
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🛡️ Role
            </label>
            <input
              type="text"
              value="student"
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">
              Role cannot be changed. Contact admin for support.
            </p>
          </div>

          {/* Save Button (only when editing) */}
          {isEditing && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mb-3 transition disabled:opacity-50"
            >
              ✅ {loading ? 'Saving...' : 'Save Changes'}
            </button>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isEditing}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              isEditing
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
