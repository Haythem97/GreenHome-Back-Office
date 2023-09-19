const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Goal = require("../models/goalModel");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, primary_email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    primary_email,
    password: hashedPassword,
  });

  if (user) {
    // Generate token for authentication
    const token = generateToken(user._id);
    const userRooms = await Goal.find({ user: primary_email   })
    console.log(userRooms);
    // Créez un tableau d'autorisations par défaut avec valeur false pour chaque chambre
    const defaultPermissions = userRooms.map((room) => ({
      roomId: room._id,
      roomName: room.name,
      autorisation: false,
    }));

    // Mettez à jour les autorisations de l'utilisateur
    user.permissions = defaultPermissions;

    // Enregistrez les modifications dans la base de données
    await user.save();

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      primary_email: user.primary_email,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/update
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;

    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      primary_email: updatedUser.primary_email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// @desc    Get other users with the same primary_email
// @route   GET /api/users/other-users
// @access  Private (seul l'administrateur peut accéder à cette route)
const getOtherUsersPermissions = asyncHandler(async (req, res) => {
  const currentUser = req.user;
  console.log(currentUser);
  try {
    // Recherchez tous les utilisateurs avec le même primary_email, mais excluez l'utilisateur actuel
    const otherUsersPermissions = await User.find({
      primary_email: currentUser.primary_email,
      _id: { $ne: currentUser._id }, // Exclure l'utilisateur actuel
    });
    console.log(otherUsersPermissions);
    // Retournez la liste des autres utilisateurs
    res.status(200).json(otherUsersPermissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getMe,
  getOtherUsersPermissions,
}
