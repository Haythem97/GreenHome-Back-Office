const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const Object = require('../models/objectModel')

// @desc    Get objects
// @route   GET /api/objects
// @access  Private
const getObjects = asyncHandler(async (req, res) => {
  const chambeId = req.params.id; // Obtenez le goalId depuis les paramètres d'URL
  const objects = await Object.find({ goal: chambeId }); // Utilisez goalId pour rechercher les objets associés au but
  res.status(200).json(objects);
});

// @desc    Get objects
// @route   GET /api/objects
// @access  Private
const getObjectsByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Obtenez l'ID de l'utilisateur depuis les paramètres d'URL

  // 1. Obtenez tous les chambres de cet utilisateur
  const userGoals = await Goal.find({ user: userId });

  // 2. Obtenez tous les objets associés aux chambres de cet utilisateur
  const objectIds = userGoals.map((goal) => goal._id);
  const userObjects = await Object.find({ goal: { $in: objectIds } });
  res.status(200).json(userObjects);
});

// @desc    Set object
// @route   POST /api/objects
// @access  Private
const setObject = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  const object = await Object.create({
    name: req.body.name,
    type: req.body.type,
    goal: req.body.chambreId,
    port: req.body.port,
    value: false,
  });
  res.status(200).json(object);

});

// @desc    Update value object
// @route   PUT /api/objects/:id
// @access  Private
const updateObject = asyncHandler(async (req, res) => {
  const object = await Object.findById(req.body._id);

  if (!object) {
    res.status(404);
    throw new Error('Object not found');
  }

  // Mettez à jour uniquement le champ spécifique avec la nouvelle valeur
  object.value = req.body.value;

  // Enregistrez les modifications de l'objet
  await object.save();

  res.status(200).json(object);
});


// @desc    Delete Object
// @route   DELETE /api/objects/:id
// @access  Private
const deleteObject = asyncHandler(async (req, res) => {
  const object = await Object.findById(req.params.id)
  if (!object) {
    res.status(400)
    throw new Error('object not found')
  }
  // Make sure the logged in user matches the goal user
  if (object._id.toString() !== req.params.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await object.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getObjects,
  getObjectsByUser,
  setObject,
  updateObject,
  deleteObject,
}
