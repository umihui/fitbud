var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');



var app = express();

var db = require('../database/index.js');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client'));

app.post('/login', function (req, res) {
	// check if username exists
	//if it doesn't then we need to create user
	db.checkUser(req.body.username, function(result) {
		if (result === true) {
			// we'll check the password
			//if the password matches log them in
			//else keep them on this page with a message wrong password
			res.redirect('/workouts');

		} else {
			db.createUser(req.body.username, req.body.password);
		}
	})
	console.log(req.body);

  res.send('Hello World!')
})


app.listen(3000, function(err){
	if(err) {
		console.log('cannot connect to the server');
	}
	console.log('listening on 3000');
})


// express session 
// express validator
