const mongoose = require('mongoose')

const objectSchema = mongoose.Schema(
    {
        goal: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Goal',
        },
        text: {
            type: String,
            required: [true, 'Please add a text value'],
        },
        type: {
            type: String,
            required: [true, 'Please add a text value'],
        },
    },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Object', objectSchema)
