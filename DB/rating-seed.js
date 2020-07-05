require('dotenv').config();

const mongoose = require('mongoose');
const Rating = require('../models/Rating');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((_) => {
    console.log('Connect to Mongo DB and ready to seed!')
  })
  .catch((error) => {
    console.log('Error connecting to Mongo DB', error)
  })

const ratings = [{
  business: '5f00e4a569bd68ae79db126d',
  user: '5f00e4d06efaf4aeaf1bda78',
  cleanliness: 1,
  space: 2,
  materials: 3,
  individualPackages: 4,
  capacity: 5,
  waiters: 4,
  procedures: 3,
  children: 2,
  ventilation: 1,
  clients: 2,
  average: 3,
}, {
  business: '5f00e4a569bd68ae79db126e',
  user: '5f00e4d06efaf4aeaf1bda75',
  cleanliness: 5,
  space: 4,
  materials: 3,
  individualPackages: 2,
  capacity: 1,
  waiters: 5,
  procedures: 4,
  children: 3,
  ventilation: 2,
  clients: 1,
  average: 3,
}];

ratings.forEach((rating) => {
  const { business, user, cleanliness, space, materials, individualPackages, capacity, waiters, procedures, children, ventilation, clients, average } = rating;

  Rating.create({ business, user, cleanliness, space, materials, individualPackages, capacity, waiters, procedures, children, ventilation, clients, average })
    .then((ratingData) => {
      console.log(`Created rating ${ratingData}`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});
