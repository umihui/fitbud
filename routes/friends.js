var express = require('express');
var router = express.Router();
var db = require('../database/index.js');

// we will add the routes for a particular user id
// get all the workouts posted by the user - select * from postings where userId = "x"
//

router.get('/', (req, res) => {
  console.log('REACHED>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  var id = req.session.passport.user;
  console.log('user id>>>>>>>>>>>:', id);
  db.getFriendsList(id, (dbResult) => {
    console.log('database RESULTS>>:', dbResult);
    res.send(dbResult);
  })
})







module.exports = router;
