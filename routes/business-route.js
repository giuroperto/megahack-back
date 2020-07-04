const express = require('express');
const router = express.Router();
const Business = require('../models/Business');

router.get('/business', (req, res, next) => {
  res.send('Business');
});

router.get('/allbusiness', (req, res, next) => {
  Business.find()
    .populate('reviews')
    .populate('discounts')
    .populate('rating')
    .then((businesses) => res.status(200).json(businesses))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.get('/business/:id', (req, res, next) => {
  const { id } = req.params;

  Business.findById(id)
    .populate('reviews')
    .populate('discounts')
    .populate('rating')
    .then((business) => res.status(200).json(business))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.post('/addbusiness', (req, res, next) => {
  const { name, address, postcode, coordinates, profilePicture, menu } = req.body;

  Business.create({ name, address, postcode, coordinates, profilePicture, menu })
    .then((newBusiness) => {
      res.status(200).json({message: 'New business successfully created', newBusiness });
    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

module.exports = router;
