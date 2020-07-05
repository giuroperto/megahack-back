const express = require('express');
const router = express.Router();
const Business = require('../models/Business');
const Rating = require('../models/Rating');
const User = require('../models/User');

router.get('/ratings', (req, res, next) => {
  Rating.find()
    .populate('business')
    .populate('user')
    .then((rating) => res.status(200).json(rating))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.get('/rating/:id', (req, res, next) => {
  const { id } = req.params;

  Rating.findById(id)
    .populate('business')
    .populate('user')
    .then((rating) => res.status(200).json(rating))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.post('/user/:userId/addrating', (req, res, next) => {
  const { business, cleanliness, space, materials, individualPackages, capacity, waiters, procedures, children, ventilation, clients, average } = req.body;
  const { userId } = req.params;

  Rating.create({ business, cleanliness, space, materials, individualPackages, capacity, waiters, procedures, children, ventilation, clients, average, user: userId })
    .then((newRating) => {
      const { _id } = newRating;

      if (!mongoose.Types.ObjectId.isValid(business) || !mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      Business.findByIdAndUpdate(business, { $push: { ratings: _id } })
        .then(response => {
          console.log(response);
          res.status(200).json({ message: 'New rating successfully created', newRating });
        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));

      User.findByIdAndUpdate(userId, { $push: { ratings: _id } })
        .then(response => {
          console.log(response);
          res.status(200).json({ message: 'New rating successfully created', newRating });
        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));
    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

module.exports = router;
