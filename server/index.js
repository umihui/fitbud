var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');

var app = express();



app.listen(3000, function(err){
	if(err) {
		console.log('cannot connect to the server');
	}
	console.log('listening on 3000');
})
