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
        value: {
            type: Boolean, // Vous pouvez définir ici le type qui représente les autorisations (lecture, écriture, etc.)
        },
    },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Object', objectSchema)
