import axios from 'axios'

const API_URL = 'https://greenhomeapi.onrender.com/api/users/'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Login user
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization:  `Bearer ${token}`,
    },
  }
 
  const response = await axios.put(API_URL + 'update', userData ,config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const authService = {
  register,
  logout,
  login,
  updateUser
}

export default authService
