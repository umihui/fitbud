var express = require('express');
var router = express.Router();
var db = require('../database/index.js');


router.post('/', function (req, res) {
  // check if username exists
  //if it doesn't then we need to create user
  console.log('hello login');
  db.checkUser(req.body.username, function(result) {
    if (result === true) {
      // we'll check the password
      //if the password matches log them in
      //else keep them on this page with a message wrong password
      res.redirect('/postings');

    } else {
      db.createUser(req.body.username, req.body.password);
      res.send('Hello World!')
    }
  })
});

module.exports = router;