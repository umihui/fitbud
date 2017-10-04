var express = require('express');
var router = express.Router();
var db = require('../database/index.js');

router.get('/', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/postings');
});



module.exports = router;