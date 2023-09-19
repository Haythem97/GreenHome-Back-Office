const express = require('express')
const router = express.Router({ mergeParams: true });
const {
  getObjects,
  setObject,
  updateObject,
  deleteObject,
} = require('../controllers/objectController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, setObject).put(protect, updateObject)
router.route('/:id').get(protect, getObjects).delete(protect, deleteObject)

module.exports = router

