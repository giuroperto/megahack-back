require('dotenv').config();

const mongoose = require('mongoose');
const Review = require('../models/Review');

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

const reviews = [{
  business: '5f00e4a569bd68ae79db126d',
  user: '5f00e4d06efaf4aeaf1bda78',
  title: 'Muit bom!',
  review: 'estava bom demais',
  media: 'https://i0.statig.com.br/bancodeimagens/69/b2/my/69b2mydwu808ftj2k95ehggwd.jpg',
  rating: 5,
}, {
  business: '5f00e4a569bd68ae79db126e',
  user: '5f00e4d06efaf4aeaf1bda75',
  title: 'Esperava mais',
  review: 'não tava bom não',
  media: 'https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/04/25/sorvete-de-gelatina.jpg',
  rating: 1,
}];

reviews.forEach((theReview) => {
  const { business, user, title, review, media, rating } = theReview;

  Review.create({ business, user, title, review, media, rating })
    .then((reviewData) => {
      console.log(`Created review ${reviewData}`);
      mongoose.connection.close();
    })
    .catch((err) => console.log(err));
});
