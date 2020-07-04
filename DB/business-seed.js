require('dotenv').config();

const mongoose = require('mongoose');
const Business = require('../models/Business');

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

const business = [{
  name: 'Santinho',
  address: 'algum endereço',
  coordinates: [-23.2222, -43.0293],
}, {
  name: 'Gigio',
  address: 'outro endereço',
  coordinates: [-23.5522, -43.1993],
}];

business.forEach((business) => {
  const { name, address, coordinates } = business;

  Business.create({ name, address, coordinates })
    .then((businessData) => {
      console.log(`Created business ${businessData}`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});