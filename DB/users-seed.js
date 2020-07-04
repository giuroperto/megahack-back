require('dotenv').config();

const mongoose = require('mongoose');
const Users = require('../models/User');

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

const users = [{
  name: 'Giulia',
  email: 'giu.roperto@gmail.com',
  points: 0,
}, {
  name: 'Fernando',
  email: 'fernando@gmail.com',
  points: 0,
}, {
  name: 'Vinicius',
  email: 'vinicius@gmail.com',
  points: 0,
}, {
  name: 'Hugo',
  email: 'hugo@gmail.com',
  points: 0,
}, {
  name: 'Jorge',
  email: 'jorge@gmail.com',
  points: 0,
}]

users.forEach((user) => {
  const { name, email, points } = user;

  Users.create({ name, email, points })
    .then((userData) => {
      console.log(`Created user ${userData}`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});