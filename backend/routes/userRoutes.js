const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  updateUserProfile,
  getMe,
  getOtherUsersPermissions,
  updatePermission
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.put('/update', protect, updateUserProfile);
router.get('/me', protect, getMe)
router.get('/userspermissions', protect, getOtherUsersPermissions)
router.put('/updatePermission', protect, updatePermission);

module.exports = router
