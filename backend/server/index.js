var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var session = require('express-session');
var passport = require('passport');
var db = require('../database/index.js');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;

var app = express();
app.use(morgan('dev'));

var routeRegister = require('../routes/register');
var routeLogin = require('../routes/login');
var routePostings = require('../routes/postings');
var routeProfile = require('../routes/profile');
var routeWorkout = require('../routes/workout');
var routeDashboard = require('../routes/dashboard');


app.use(bodyParser.json()); 
app.use(cookieParser());
app.use(express.static('client'));
app.use(passport.initialize());
app.use(passport.session());

app.use('/register', routeRegister);

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
