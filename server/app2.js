
const serverPort = 9000;
const express = require("express");
var app = express();
const mysql = require('mysql');

/*
*		server create
*/
var server = app.listen(serverPort, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

/*
*   database connection
*/
exports.connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: '3306',
  database: 'halmotor'
});
exports.connection.connect((error) => {
	if(error){
		console.log('Error!! mysql connection:' + error.stack);
		return;
	}
  console.log('mysql connection success');
});

/*
*	  request '/admin'
*/
app.use('/admin', require('./func/admin.js'));

/*
*   request '/car'
*/
app.use('/car', require('./func/car.js'));

/*
*   request '/user'
*/
app.use('/user', require('./func/user.js'));

/*
*   request '/auction'
*/
app.use('/auction', require('./func/auction.js'));
