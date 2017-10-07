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
// CREATE TABLE postings (
//   id INT NOT NULL AUTO_INCREMENT,
//   title varchar(20),
//   location varchar(255) NOT NULL,
//   date DATETIME,
//   duration INT NOT NULL,
//   details varchar(255) NOT NULL,
//   meetup_spot varchar(255) NOT NULL,
//   userId INT,
  
//   PRIMARY KEY (id),
//   FOREIGN KEY (userId) REFERENCES users(id)
// );

//when we click a single workout we will open up the workout page - first a post request to retrieve the title
//then a get request to get it by the id
router.post('/', (req, res) => {
  // var id = req.session.passport.user;
  console.log('session id in workout', req.user.id);

  var workoutObj = {
    title: req.body.title, 
    location: req.body.location, 
    date: req.body.date, 
    duration: req.body.duration, 
    details: req.body.details, 
    meetup_spot: req.body.meetup_point, 
    userId: req.user.id
  };
  console.log('workoutOBJ>>>>>>>>>>', workoutObj);

  db.createWorkout(workoutObj, (err, dbResult) => {
    res.status(201).send(dbResult);
  })
  
});

router.get('/:id', (req, res) => {
  //console.log('workout req query', req.params.id);
  db.getSingleWorkout(req.params.id, (result) => {
    //console.log('result of the get for a single workout', result);
    res.status(200).json(result);
  });
});

router.post('/:id', (req, res) => {
  //console.log('workout req query', req.params.id);
  var id = req.user.id;
  var reqObj = {
    postingId: req.params.id,
    userId: id,
    status: 'pending'
  }
  db.createRequest(reqObj, (result) => {
    //console.log('request created in the table', result);
    res.status(200).send('request created');
  });
});

router.patch('/:id/accept', (req, res) => {
  //console.log('workout req query', req.params.id);
  var id = req.user.id;
  db.updateRequest(id, (result) => {
    //console.log('request created in the table', result);
    res.status(200).send('request accepted');
  });
});

module.exports = router;
