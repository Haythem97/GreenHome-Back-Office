const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: 'User',
    },
    type:{
        type: String,
    },
    name: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', goalSchema)
