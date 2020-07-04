const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/User');

router.get('/allusers', (req, res, next) => {
  User.find()
    // .populate('reviews')
    // .populate('discounts')
    // .populate('ratings')
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
});

router.get('/user/:userId', (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    // .populate('reviews')
    // .populate('discounts')
    // .populate('ratings')
    .then((response) => res.status(200).json(response))
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
});

module.exports = router;
