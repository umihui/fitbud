var express = require('express');
var router = express.Router();
var db = require('../database/index.js');

// /postings
router.get('/', (req, res) => {
  console.log('session id in workout', req.session.passport.user);
  
  db.getWorkouts((result) => {
    res.status(200).send(result);
  });
});

//when we click a single workout we will open up the workout page - first a post request to retrieve the title
//then a get request to get it by the id
router.post('/workout', (req, res) => {
  // console.log('session id in workout', req.session.passport.user);
  var title = req.body.title;
  console.log('post req.body', req.body.title);
  res.status(201).send(req.body);
});

router.get('/workout/:id', (req, res) => {
  console.log('workout req query', req.params.id);
  db.getSingleWorkout(req.params.id, (result) => {
    console.log('result of the get for a single workout', result);
    res.status(200).json(result);
  });
});

router.post('/workout/:id', (req, res) => {
  console.log('workout req query', req.params.id);
  var id = req.session.passport.user;
  var reqObj = {
    postingId: req.params.id,
    userId: id,
    status: 'pending'
  }
  db.createRequest(reqObj, (result) => {
    console.log('request created in the table', result);
    res.status(200).send('request created');
  });
});

router.patch('/workout/:id/accept', (req, res) => {
  console.log('workout req query', req.params.id);
  var id = req.session.passport.user;
  
  db.updateRequest(id, (result) => {
    console.log('request created in the table', result);
    res.status(200).send('request accepted');
  });
});

module.exports = router;
