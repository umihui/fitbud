var express = require('express');
var router = express.Router();
var db = require('../database/index.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('../config/auth');



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



module.exports = router;
