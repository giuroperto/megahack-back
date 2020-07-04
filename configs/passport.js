const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
// const bcrypt = require('bcryptjs');

passport.serializeUser((loggedInUser, cb) => {
  cb(null, loggedInUser._id);
});

passport.deserializeUser((userIdFromSession, cb) => {
  User.findById(userIdFromSession, (err, userDocument) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, userDocument);
  });
});

// // add social login

// passport.use(new LocalStrategy((username, password, next) => {
//   User.findOne({ username }, (err, foundUser) => {
//     if (err) {
//       next(err);
//       return;
//     }

//     if (!foundUser) {
//       next(null, false, { message: 'Incorrect username or password.' });
//       return;
//     }

//     if (!bcrypt.compareSync(password, foundUser.password)) {
//       next(null, false, { message: 'Incorrect username or password.' });
//       return;
//     }

//     next(null, foundUser);
//   });
// }));



// 'use strict';

// require('./mongoose')();
// var passport = require('passport');
// var TwitterTokenStrategy = require('passport-twitter-token');
// var User = require('mongoose').model('User');
// var FacebookTokenStrategy = require('passport-facebook-token');
// var GoogleTokenStrategy = require('passport-google-token').Strategy;
// var config = require('./config');

// module.exports = function () {

//     passport.use(new TwitterTokenStrategy({
//             consumerKey: config.twitterAuth.consumerKey,
//             consumerSecret: config.twitterAuth.consumerSecret,
//             includeEmail: true
//         },
//         function (token, tokenSecret, profile, done) {
//             User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
//                 return done(err, user);
//             });
//         }));

//     passport.use(new FacebookTokenStrategy({
//             clientID: config.facebookAuth.clientID,
//             clientSecret: config.facebookAuth.clientSecret
//         },
//         function (accessToken, refreshToken, profile, done) {
//             User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
//                 return done(err, user);
//             });
//         }));

//     passport.use(new GoogleTokenStrategy({
//             clientID: config.googleAuth.clientID,
//             clientSecret: config.googleAuth.clientSecret
//         },
//         function (accessToken, refreshToken, profile, done) {
//             User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
//                 return done(err, user);
//             });
//         }));
// };