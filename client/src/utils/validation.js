// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email.toLowerCase())
}

// Password validation (min 8 chars, 1 uppercase, 1 lowercase, 1 number)
export const validatePassword = (password) => {
  const minLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  
  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
    errors: {
      minLength: !minLength ? 'Password must be at least 8 characters' : '',
      hasUpperCase: !hasUpperCase ? 'Password must contain an uppercase letter' : '',
      hasLowerCase: !hasLowerCase ? 'Password must contain a lowercase letter' : '',
      hasNumber: !hasNumber ? 'Password must contain a number' : '',
    }
  }
}

// Phone validation (Egyptian format)
export const validatePhone = (phone) => {
  const re = /^(010|011|012|015)\d{8}$/
  return re.test(phone)
}

// Name validation
export const validateName = (name) => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name)
}

// Student ID validation
export const validateStudentId = (id) => {
  return /^\d{6,10}$/.test(id)
}

// Form validation
export const validateForm = (formData, fields) => {
  const errors = {}
  
  fields.forEach(field => {
    const value = formData[field.name]
    
    if (field.required && !value) {
      errors[field.name] = `${field.label} is required`
      return
    }
    
    switch (field.type) {
      case 'email':
        if (value && !validateEmail(value)) {
          errors[field.name] = 'Invalid email address'
        }
        break
      case 'password':
        if (value) {
          const validation = validatePassword(value)
          if (!validation.isValid) {
            errors[field.name] = Object.values(validation.errors).filter(e => e)[0]
          }
        }
        break
      case 'phone':
        if (value && !validatePhone(value)) {
          errors[field.name] = 'Invalid phone number (must be Egyptian format)'
        }
        break
      case 'name':
        if (value && !validateName(value)) {
          errors[field.name] = 'Name must contain only letters'
        }
        break
      case 'studentId':
        if (value && !validateStudentId(value)) {
          errors[field.name] = 'Invalid student ID'
        }
        break
      default:
        break
    }
  })
  
  return errors
}
