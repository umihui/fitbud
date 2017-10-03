var express = require('express');
var router = express.Router();
var db = require('../database/index.js');

// /postings
router.get('/', (req, res) => {
  db.getWorkouts((result) => {
    res.status(200).send(result);
  });
});

//when we click a single workout we will open up the workout page - first a post request to retrieve the title
//then a get request to get it by the id
router.post('/workout', (req, res) => {
  var title = req.body.title;
  console.log('post req.body', req.body.title);
  res.status(201).send(req.body);
});

router.get('/workout/:id', (req, res) => {
  console.log('workout req query', req.query.id);
  db.getSingleWorkout(req.query.id, (result) => {
    console.log('result of the get for a single workout', result);
    res.status(200).send(JSON.stringify(result));
  });
});


module.exports = router;
