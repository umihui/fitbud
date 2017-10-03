var express = require('express');
var router = express.Router();
var db = require('../database/index.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('username and password:', username, password);
    db.checkUser(username, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


// passport.serializeUser(function(user, done) {
//   console.log('user in serialize', user);
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   db.findById(id, function(err, user) {
//     done(err, user);
//   });
// });


// on success login, redirect to dashboards
router.post('/',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
  function(req, res) {
    res.redirect('/');
});




router.get('/', (req, res) => {
  console.log('login get')
  res.end();
});

module.exports = router;
//create register
//login 