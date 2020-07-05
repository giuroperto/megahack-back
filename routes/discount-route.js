const express = require('express');
const mongoose = require('../configs/mongoose');
const router = express.Router();
const Discount = require('../models/Discounts');
const Business = require('../models/Business');
const User = require('../models/User');

router.get('/discounts', (req, res, next) => {
  Discount.find()
  .populate('business')
  .populate('businesses')
    .populate('user')
    .then((discounts) => res.status(200).json(discounts))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.get('/discount/:id', (req, res, next) => {
  const { id } = req.params;

  Discount.findById(id)
  .populate('business')
  .populate('businesses')
    .populate('user')
    .then((discount) => res.status(200).json(discount))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.put('/discount/:id', (req, res, next) => {
  const { id } = req.params;
  const { businessId, userId } = req.body;

  Discount.findById(id)
    .then((discount) => {

      // if (!mongoose.Types.ObjectId.isValid(businessId) || !mongoose.Types.ObjectId.isValid(userId)) {
      //   res.status(400).json({ message: 'Specified id is not valid' });
      //   return;
      // }

      const allBusiness = discount.business;
      allBusiness.push(businessId);
      const allUsers = discount.user;
      allUsers.push(userId);

      Discount.findByIdAndUpdate(id, { business: allBusiness, user: allUsers })
        .then((editedDiscount) => {
          
          Business.findByIdAndUpdate(businessId, { $push: { discounts: id } })
          .then(response => {
            console.log(response);
            res.status(200).json({ message: 'New discount successfully created', editedDiscount });
          })
          .catch((err) => res.status(500).json({ message: 'Something went wrong with business... Try again', err }));

          User.findByIdAndUpdate(userId, { $push: { discounts: id } })
            .then(response => {
              console.log(response);
              res.status(200).json({ message: 'New discount successfully created', discount });
            })
            .catch((err) => res.status(500).json({ message: 'Something went wrong with user... Try again', err }));

        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong with discount... Try again', err }));
    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong with adding... Try again', err }));
});

router.post('/add-discount', (req, res, next) => {
  const { title, owner } = req.body;

  Discount.create({ title, owner })
    .then((newDiscount) => {
      res.status(200).json({ message: 'Ok' });
    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong with adding... Try again', err }));
});

router.post('/add-discount', (req, res, next) => {

  const { owner, title, description, picture, expiration } = req.body;

  Discount.create({ owner, title, description, picture, expiration })
    .then((newDiscount) => {
      const { _id } = newDiscount;

      // if (!mongoose.Types.ObjectId.isValid(owner)) {
      //   res.status(400).json({ message: 'Specified id is not valid' });
      //   return;
      // }

      Business.findByIdAndUpdate(owner, { $push: { discounts: _id } })
        .then(response => {
          console.log(response);
          res.status(200).json({ message: 'New discount successfully created', newDiscount });
        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong with business... Try again', err }));
    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong with adding... Try again', err }));
});

module.exports = router;
