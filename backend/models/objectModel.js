const mongoose = require('mongoose')

const objectSchema = mongoose.Schema(
    {
        goal: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Goal',
        },
        name: {
            type: String,
            required: [true, 'Please add a name value'],
        },
        type: {
            type: String,
            required: [true, 'Please add a type value'],
        },
        port: {
            type: String,
            required: [true, 'Please add a type value'],
        },
    },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Object', objectSchema)
