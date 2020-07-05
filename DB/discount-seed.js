require('dotenv').config();

const mongoose = require('mongoose');
const Discount = require('../models/Discounts');

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

const discounts = [{
  owner: '5f00e4a569bd68ae79db126d',
  title: '10% off em todos produtos',
  description: 'todos os pratos com 10% de desconto',
  expiration: 20-05-2020,
}, {
  owner: '5f00e4a569bd68ae79db126e',
  title: '2 por 1',
  description: 'todas as cervejas 2 por 1',
  expiration: 20-08-2020,
}];

discounts.forEach((discount) => {
  const { business, user, title, description, expiration } = discount;

  Discount.create({ business, user, title, description, expiration })
    .then((discountData) => {
      console.log(`Created discount ${discountData}`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});
