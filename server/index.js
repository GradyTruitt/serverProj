const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('morgan');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');


const usersRoute = require('./routes/usersRoute');
const detailersRoute = require('./routes/detailersRoute');

const { dbUser, database, secret } = require('../config');
const port = 3000;
const connectionString = `postgress://${dbUser}@localhost/${database}`;

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.static(`${__dirname}/../public`));
app.use(flash());

const massiveConnection = massive(connectionString)
    .then(db => {
        app.set('db', db);
    })
    .catch(err => {
        console.log(err);
});

app.use(session({
    secret,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser((user, done) => {
  done(null, { user });
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.use(bodyParser.json());

passport.use(new LocalStrategy(function (username, password, done) {
  const db = app.get('db');
  db.users.findOne({ username }).then(function (user) {
    if (!user) {
      return done(null, false);
    }
    const authenticated = bcrypt.compareSync(password, user.password);

    if (!authenticated) {
      return done(null, false);
    }
    return done(null, user);
  });
}));

const isLoggedIn = function (req, res, next) {
  if (!req.user) {
    console.log('not logged in');
    return res.status(401).json('not logged in');
  }
  return next();
};

app.get('/authcheck', isLoggedIn, (req, res) => res.json(req.session));

app.post('/auth/login', passport.authenticate('local', { failureFlash: true }), (req, res) =>
  res.send(req.session));

app.post('/auth/register/user', (req, res) => {
  const db = req.app.get('db');
  bcrypt.hash(req.body.password, 10).then((hash) => {
    db
      .addUser([req.body.username, hash, req.body.firstName, req.body.usertype, req.body.location])
      .then(function(id) {
        id = parseInt(id[0].id);
        db.addCar([id, req.body.year, req.body.make, req.body.model]);
      })
      .then(() => passport.authenticate('local'))
      .then(function() {
        res.send(req.session);
      });
  });
});

app.post('/auth/register/detailer', (req, res) => {
  const db = req.app.get('db');
  bcrypt.hash(req.body.password, 10).then((hash) => {
    db
      .addDetailer([req.body.username, hash, req.body.companyName, req.body.usertype, req.body.zipcode])
      .then(() => passport.authenticate('local'))
      .then(function() {
        res.send(req.session);
      });
  });
});

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.json('ok');
});

app.get('/user/session', (req, res, next) => {
  res.send(req.session);
});

/////////////////////////////////////

app.use('/api/users', usersRoute);
app.use('/api/detailers', detailersRoute);



app.listen(port, () => {
    console.log(`listening on port ${port}`);
});








