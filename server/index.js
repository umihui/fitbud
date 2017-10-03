var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var db = require('../database/index.js');

var app = express();
app.use(morgan('dev'));

var routeLogin = require('../routes/login');
var routePostings = require('../routes/postings');
var routeProfile = require('../routes/profile');
var routeWorkout = require('../routes/workout');
var routeDashboard = require('../routes/dashboard');


app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client'));


app.use('/login', routeLogin);

app.use('/postings', routePostings);

app.use('/profile', routeProfile);

app.use('/workout', routeWorkout);

app.use('/dashboard', routeDashboard);



app.listen(3000, function(err){
	if(err) {
		console.log('cannot connect to the server');
	}
	console.log('listening on 3000');
})


// express session 
// express validator
