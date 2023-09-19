const mongoose = require('mongoose');

const roomPermissionSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true,
    },
    roomName:{
        type: String,
    },
    permission: {
        type: String, // Vous pouvez définir ici le type qui représente les autorisations (lecture, écriture, etc.)
        required: true,
    },
});

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
        },
        primary_email: {
            type: String,
            required: [true, 'Please add a primary_email'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        permissions: [roomPermissionSchema], // Champ pour stocker les autorisations par chambre
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
