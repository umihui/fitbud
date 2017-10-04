var express = require('express');
var router = express.Router();
var db = require('../database/index.js');
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', function (req, res) {
  // check if username exists
  //if it doesn't then we need to create user
  console.log('hello register');
  db.checkUser(req.body.username, function(result) {
    if (result[0].length !== 0) {
      // the user exists and we will need to send a message and redirect them to login instead
      res.redirect('/login');

    } else {
      db.createUser(req.body);
      // res.send('go to login')
      res.redirect('/login')
    }
  })
});

module.exports = router;