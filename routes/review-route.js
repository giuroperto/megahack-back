const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Business = require('../models/Business');
const User = require('../models/User');

router.get('/reviews', (req, res, next) => {
  Review.find()
    .populate('business')
    .populate('user')
    .then((reviews) => res.status(200).json(reviews))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }))
});

router.get('/review/:id', (req, res, next) => {
  const { id } = req.params;

  Review.findById(id)
    .populate('business')
    .populate('user')
    .then((review) => res.status(200).json(review))
    .catch(err => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

router.post('/user/:userId/addreview', (req, res, next) => {
  const { business, title, review, media, rating } = req.body;
  const { userId } = req.params;

  Review.create({ business, title, review, media, rating, user: userId })
    .then((newReview) => {
      const { _id } = newReview;

      if (!mongoose.Types.ObjectId.isValid(business) || !mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      Business.findByIdAndUpdate(business, { $push: { reviews: _id } })
        .then(response => {
          console.log(response);
          res.status(200).json({ message: 'New review successfully created', newReview });
        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));

      User.findByIdAndUpdate(userId, { $push: { reviews: _id } })
        .then(response => {
          console.log(response);
          res.status(200).json({ message: 'New review successfully created', newReview });
        })
        .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));

    })
    .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again', err }));
});

module.exports = router;



//   pictures: [String],
//   busy: { type: String, enum: ['Lotado', 'Movimentado', 'Moderado', 'Vazio'] },

