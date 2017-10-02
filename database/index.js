var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'fitbud'
});

connection.connect(function(err){
	if (err) {
		console.log('could not connect to db');
	} else {
		console.log('connected to db');
	}
});

var createUser = function(username, pass) {
	var query = 'INSERT INTO users (email, password) values (?, ?)';
	connection.query(query, [username, pass], function(err, result){
		if (err) {
			console.log('error inserting user');
		} else {
			console.log('successfully added');
		}
	})
}

var checkUser = function(username, callback) {
	var query = 'SELECT * from users WHERE username = ?';
	connection.query(query, [username], function(err, result){
		if (err) {
			console.log('error when finding user');
		} else{
			console.log(result);
			callback(true);
		}
	})
}

module.exports.checkUser = checkUser;
module.exports.createUser = createUser;