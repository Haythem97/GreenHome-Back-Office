const express = require('express')
const router = express.Router({ mergeParams: true });
const {
  getObjects,
  getObjectsByUser,
  setObject,
  updateObject,
  deleteObject,
} = require('../controllers/objectController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getObjects).get(protect, getObjectsByUser).post(protect, setObject)
router.route('/:id').delete(protect, deleteObject).put(protect, updateObject)

module.exports = router

