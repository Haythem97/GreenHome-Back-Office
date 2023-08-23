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
  const goalId = req.params.goalId; // Obtenez le goalId depuis les paramètres d'URL
  const objects = await Object.find({ goal: goalId }); // Utilisez goalId pour rechercher les objets associés au but
  res.status(200).json(objects);
});

// @desc    Set object
// @route   POST /api/objects
// @access  Private
const setObject = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  const object = await Object.create({
    text: req.body.text,
    type: req.body.type,
    goal: req.body._id,
  });

  res.status(200).json(object);


  device.publish('aws/kk', JSON.stringify({ test_data: object }));

  device.on('message', function (topic, payload) {
    console.log('message', topic, payload.toString());
  });
});

// @desc    Update object
// @route   PUT /api/objects/:id
// @access  Private
const updateObject = asyncHandler(async (req, res) => {
  const object = await Object.findById(req.params.id)

  if (!object) {
    res.status(400)
    throw new Error('object not found')
  }

  // Check for goal
  if (!req.goal) {
    res.status(401)
    throw new Error('goal not found')
  }

  // Make sure the logged in goal matches the object goal
  if (object.goal.toString() !== req.goal.id) {
    res.status(401)
    throw new Error('goal not authorized')
  }

  const updatedObject = await Object.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedObject)
})

// @desc    Delete Object
// @route   DELETE /api/objects/:id
// @access  Private
const deleteObject = asyncHandler(async (req, res) => {
  const object = await Object.findById(req.params.id)

  if (!object) {
    res.status(400)
    throw new Error('object not found')
  }

  // Check for goal
  if (!req.goal) {
    res.status(401)
    throw new Error('goal not found')
  }

  // Make sure the logged in goal matches the object goal
  if (object.goal.toString() !== req.goal.id) {
    res.status(401)
    throw new Error('goal not authorized')
  }

  await object.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getObjects,
  setObject,
  updateObject,
  deleteObject,
}
