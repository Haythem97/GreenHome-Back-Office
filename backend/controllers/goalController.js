const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

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

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id })
  res.status(200).json(goals)
})

// @desc    Get goal by id
// @route   GET /api/goals/goal
// @access  Private
const getGoal = asyncHandler(async (req, res) => {
  const goalId = req.params.GoalId; // Obtenez le goalId depuis les paramètres d'URL
  try {
    const goal = await Goal.findOne({ _id: goalId, user: req.user.id });
    if (goal) {
      res.status(200).json(goal);
    } else {
      res.status(404).json({ message: "Goal not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching goal" });
  }
});

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const goal = await Goal.create({
    name: req.body.name,
    type: req.body.type,
    user: req.user.id,
  });

  res.status(200).json(goal);


  device.publish('aws/kk', JSON.stringify({ test_data: goal }));

  device.on('message', function (topic, payload) {
    console.log('message', topic, payload.toString());
  });
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.GoalId)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getGoals,
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
}
