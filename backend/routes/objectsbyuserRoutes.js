const express = require('express')
const router = express.Router({ mergeParams: true });
const {getObjectsByUser} = require('../controllers/objectController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getObjectsByUser)

module.exports = router

