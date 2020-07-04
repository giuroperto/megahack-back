const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/User');

// router.get('/user/:userId', (req, res, next) => {
//   const { userId } = req.params;

//   User.findOne({ username })
//     .populate('favourites')
//     .then((response) => res.status(200).json(response))
//     .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
// });

// router.put('/user/:username', (req, res, next) => {
//   const { username } = req.params;
//   const { firstName, lastName, email, usernameForm, oldPassword, newPassword, picture } = req.body;

//   if (!oldPassword) {
//     res.status(400).json({ message: 'Password is required' });
//     return;
//   }

//   User.findOne({ username })
//     .then((response) => {
//       if (!bcrypt.compareSync(oldPassword, response.password)) {
//         res.status(400).json({ message: 'Incorrect password' });
//         return;
//       }
      
//       if (newPassword) {
//           const salt = bcrypt.genSaltSync(bcryptSalt);
//           const password = bcrypt.hashSync(newPassword, salt);
          
//           User.findOneAndUpdate({ username }, { firstName, lastName, email, username: usernameForm, password, picture }, { new: true })
//           .then((_) => res.status(200).json({ message: `User ${username} was updated successfully.` }))
//           .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }))
//         } else {
//           User.findOneAndUpdate({ username }, { firstName, lastName, email, username: usernameForm, picture }, { new: true })
//             .then((_) => res.status(200).json({ message: `User ${username} was updated successfully.` }))
//             .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }))
//       }
//     })
//     .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
// });

// router.delete('/user/:username', (req, res, next) => {
//   const { username } = req.params;

//   User.findOneAndRemove({ username })
//     .then((_) => res.status(200).json({ message: `User ${username} was successfully deleted.` }))
//     .catch((err) => res.status(500).json({ message: 'Something went wrong... Try again!', err }));
// });


module.exports = router;