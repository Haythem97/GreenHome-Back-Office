const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const Object = require('../models/objectModel')

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
var awsIot = require('aws-iot-device-sdk');

//
// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//
var device = awsIot.device({
  keyPath: 'private.pem.key',
  certPath: 'certificate.pem.crt',
  caPath: 'root-CA.pem',
  clientId: 'testconnection',
  host: 'agkj70tot2l60-ats.iot.eu-north-1.amazonaws.com'
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//


device.on('connect', function () {
  device.subscribe('mqtt/receive');
});

// @desc    Get objects
// @route   GET /api/objects
// @access  Private
const getObjects = asyncHandler(async (req, res) => {
  const chambeId = req.body.chambeId; // Obtenez le goalId depuis les paramètres d'URL
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
    goal: req.body.goalId,
    port: req.body.port,
    value: false,
  });
  res.status(200).json(object);


  device.publish('aws/kk', JSON.stringify({ test_data: object }));

  device.on('message', function (topic, payload) {
    console.log('message', topic, payload.toString());
  });
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

  // Vous pouvez vérifier d'autres autorisations ou conditions ici si nécessaire.

  // Assurez-vous que la clé que vous voulez mettre à jour existe dans la requête.
  if (!req.body.value) {
    res.status(400);
    throw new Error('Field to update not provided');
  }

  // Mettez à jour uniquement le champ spécifique avec la nouvelle valeur
  object.value = req.body.newValue;

  // Enregistrez les modifications de l'objet
  await object.save();

  res.status(200).json(object);
});


// @desc    Delete Object
// @route   DELETE /api/objects/:id
// @access  Private
const deleteObject = asyncHandler(async (req, res) => {
  const object = await Object.findById(req.params.id)
  const goal = await Goal.findById(req.params.goalId)

  if (!object) {
    res.status(400)
    throw new Error('object not found')
  }

  // Check for goal
  if (!goal) {
    res.status(401)
    throw new Error('goal not found')
  }

  // Make sure the logged in user matches the goal user
  if (object.goal.toString() !== req.params.goalId) {
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
