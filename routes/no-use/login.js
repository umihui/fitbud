var express = require('express');
var router = express.Router();
var db = require('../database/index.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../config/auth');



passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('username and password:', username, password);
    db.checkUser(username, function (err, dbUserResult) {
      console.log('user inside passport:', dbUserResult)
      if (err) { return done(err); }
      if (!dbUserResult) { return done(null, false); }
      db.comparePassword(password, dbUserResult[0].password, function(err, isMatch){
        //console.log('inside passports compare password');
        if (err) {
          //console.log('cannot compare passwords');
        }
        if(isMatch) {
          return done (null, dbUserResult, {message: 'password matched'});
        } else {
          //console.log('checking for invalid password')
          return done(null, false, {message: 'invalid password'});
        }
      });


  });

}));

passport.use(new FacebookStrategy(
  {
    clientID        : configAuth.facebookAuth.clientID,
    clientSecret    : configAuth.facebookAuth.clientSecret,
    callbackURL     : configAuth.facebookAuth.callbackURL
  },

    // facebook will send back the token and profile
  function(token, refreshToken, profile, done) {

    process.nextTick(function() {
      db.findByFB(profile.id, function(err, user) {
        if (err)
            return done(err);
        // if the user is found, then log them in
        if (user) {
            return done(null, user); // user found, return that user
        } else {
            // if there is no user found with that facebook id, create them
            var newUser = {};
            // set all of the facebook information in our user model
            newUser.id    = profile.id; // set the users facebook id
            newUser.token = token; // we will save the token that facebook provides to the user
            newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
            db.insertFBuser(newUser, function(err) {
                if (err)
                    throw err;
                return done(null, newUser);
            });
         }

      });
    });

  })
);



passport.serializeUser(function(user, done) {
  //console.log('user in serialize', user);
  done(null, user[0].id);
});

passport.deserializeUser(function(id, done) {
  console.log('in deserialize', id);
  db.findById(id, function(err, user) {
  // console.log('user in deserialize', user);
    done(err, user);
  });
});


// on success login, redirect to dashboards
// successRedirect:'/',

// on successful login
// router.post('/',
//   passport.authenticate('local', {failureFlash: true, successFlash: true}),
//
//
//   function(req, res) {
//     // console.log('request inside login:', req)
//     //console.log('cookies', req.cookies);
//     // res.redirect('/dashboard');
//     console.log('auth user:', req.user)
//     res.json(req.user);
// });
//
//
//
//
//
// router.get('/', (req, res) => {
//   //console.log('login get')
//   res.end();
// });

module.exports = passport;
//create register
//login
