const express = require('express');
const mongoose = require('../configs/mongoose');
const router = express.Router();
const Discount = require('../models/Discounts');
const Business = require('../models/Business');
const User = require('../models/User');

router.get('/discounts', (req, res, next) => {
  Discount.find()
    .populate('business')
    .populate('user')
    .then((discounts) => res.status(200).json(discounts))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.get('/discount/:id', (req, res, next) => {
  const { id } = req.params;

  Discount.findById(id)
    .populate('business')
    .populate('user')
    .then((discount) => res.status(200).json(discount))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
})

router.post('/adddiscount', (req, res, next) => {
  const { business, title, description, picture, expiration, userId } = req.body;

  Discount.create({ business, title, description, picture, expiration, user: userId })
    .then((newDiscount) => {
      const { _id } = newDiscount;

      if (!mongoose.Types.ObjectId.isValid(business) || !mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      Business.findByIdAndUpdate(business, { $push: { discounts: _id } })
        .then(response => {
          console.log(response);
          res.status(200).json({ message: 'New discount successfully created', newDiscount });
        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));

      User.findByIdAndUpdate(userId, { $push: { discounts: _id } })
        .then(response => {
          console.log(response);
          res.status(200).json({ message: 'New discount successfully created', newDiscount });
        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));

    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

module.exports = router;
