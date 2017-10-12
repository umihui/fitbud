var express = require('express');
var router = express.Router();
var db = require('../database/index.js');

// /search
// user creating a new workout
router.get('/', (req, res) => {
  console.log(req.query);
  var result = [{name: 'Users', results:[{title: 'hi', description:'hello'},{title: 'bye', description:'good'}]}, {name:'Events', results:[{title:'events'}]}];
  Promise.all([
    db.searchUsers(req.query.term),
    db.serachPostings(req.query.term)
  ]).then(data => {
    console.log(data);
    res.send(data);
  });
  // res.send(result);
});


module.exports = router;
