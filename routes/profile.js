var express = require('express');
var router = express.Router();
var db = require('../database/index.js');

router.post('/', (req, res) => {
  var profileObj = {
    gender: req.body.gender,
    activity: req.body.activity,
    userId: req.body.userId
  };
  db.createProfile(profileObj, (result) => {
    console.log('created profile');
    res.send('liz');
  });
});

module.exports = router;