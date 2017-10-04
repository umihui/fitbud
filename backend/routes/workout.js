var express = require('express');
var router = express.Router();
var db = require('../database/index.js');

// /workout
// user creating a new workout
router.post('/', (req, res) => {
  var id = req.session.passport.user;
  var workoutObj = {
    title: req.body.title,
    location: req.body.location,
    date: req.body.date,
    duration: req.body.duration,
    details: req.body.details,
    meetup_spot: req.body.meetup_spot,
    userId: id
  };
  db.createWorkout(workoutObj, (result) => {
    console.log('createworkout result', result);
    res.redirect('/postings');
  });
  
});


module.exports = router;
