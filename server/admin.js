
const serverPort = 9000;

var express = require('express');
var app = express();
const http = require('http');
const mysql = require('mysql');

/*
*   database connection
*/
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: '3306',
  database: 'halmotor'
});
connection.connect((error) => {
	if(error){
		console.log('Error!! mysql connection:' + error.stack);
		return;
	}
	console.log('mysql connection success');
});

/*
*   server create
*/
var server = app.listen(serverPort, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

/*
*   GET request
*/
app.get('/admin', function(req, res) {
	connection.query(
		'SELECT * FROM employee_info',
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}
			// console.log(results);

			res.status(200).send(results);
		}
	)
});

app.get('/admin/AdminID/:adminID', function(req, res) {

	let adminID = parseInt(req.params.adminID, 10);

	let values = [
		'employee_info',
		adminID
	];

	connection.query(
		'SELECT * FROM ?? WHERE employee_id = ?', values,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}

			console.log(results.length);
			res.status(200).send(results);
		}
	)
});

app.get('/admin/Adminame/:name', function(req, res) {

	let values = [
		'employee_info',
		req.params.name
	];

	connection.query(
		'SELECT * FROM ?? WHERE employee_name = ?', values,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}

			console.log(results.length);
			res.status(200).send(results);
		}
	)
})