const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getMe,
  getOtherUsersPermissions,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/update', protect, updateUserProfile);
router.get('/me', protect, getMe)
router.get('/userspermissions', protect, getOtherUsersPermissions)

module.exports = router
