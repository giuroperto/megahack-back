require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// var path = require('path');
// var favicon = require('serve-favicon');
// var bodyParser = require('body-parser');

// require('./configs/passport');

const app = express();

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then((response) => console.log(`MongoDB: ${response.connections[0].name}`))
.catch((err) => console.log(err));

// middlewares

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));


// session

app.use(session({
  secret: 'mega-hack',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 6000000,
  },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  }),
}));

// initializing passport

app.use(passport.initialize());
app.use(passport.session());

// cors
//
app.use(cors({
  credentials: true,
  origin: process.env.REACT_APP_API_URL,
  // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // exposedHeaders: ['x-auth-token'],
}));

// routes

const globalRoutes = require('./routes/index');
app.use('/api', globalRoutes);

app.use('/api', require('./routes/business-route'));
app.use('/api', require('./routes/discount-route'));
app.use('/api', require('./routes/rating-route'));
app.use('/api', require('./routes/review-route'));
app.use('/api', require('./routes/user-route'));
// app.use('/api', require('./routes/auth-route'));

// app.use((req, res, next) => {
//   // If no routes match, send them the React HTML.
//   res.sendFile(__dirname + "/public/index.html");
// });

app.listen(process.env.PORT, () => console.log(`Listening on Port: ${process.env.PORT}`));

module.exports = app;




// var index = require('./routes/index');

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


// app.use('/api/v1/', index);
