
const serverPort = 9000;

var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const http = require('http');
const mysql = require('mysql');
const cors = require('cors');

// app.use(cors());

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({
	extended: true
}));

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
*		data number
*/
let num = 0;
connection.query(
	'SELECT COUNT(*) AS count FROM employee_info',
	(error, results) => {

		console.log(results[0].count);
		num = results[0].count;
	}
)

/*
*		login request
*/
app.get('/admin/login', function(req, res){
	res.sendFile(__dirname + '/view/login.html');
});

/*
* 	login
*/
let testmail = 'admin@hal.ac.jp';
let testpass = 'admin';
let username = 'Seima Yonesho';
var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

app.use(passport.initialize());
app.use(session({ resave:false,saveUninitialized:false, secret: 'passport test' }));
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
		if(username == testmail && password == testpass){
			return done(null, username);
		}
    else {
			console.log("login error")
      return done(null, false, { message: 'ログインできませんでした' });
		}
  }
));

passport.serializeUser(function(user, done) {
  done(null, username);
});

passport.deserializeUser(function(user, done) {
  done(null, username);
});


app.post('/admin/login', passport.authenticate('local'),function(req, res){
	console.log('login!!');
	// console.log(req.body.email);
	// console.log(req.body.password);
	res.status(200).send({'username' : username});
	// res.redirect('../Admin/index.html');
});

/*
*	POST request
*/
app.use(bodyParser.json());
app.post('/admin', function(req,res) {
	console.log('post request!!');
	console.log(req.body);

	let employee_id = 10001 + num;

	let values = [
		employee_id,
		req.body.employee_name,
		req.body.employee_mail,
		req.body.employee_pass,
		req.body.employee_phone
	];
	
	connection.query(
		'INSERT INTO employee_info(employee_id, employee_name, employee_mail, employee_pass, employee_phone, del_flg) VALUES(?, ?, ?, ?, ?, 0)', values,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}
			// console.log(results);

			resData = {
				'msg' : '登録完了'
			}

			res.status(200).send(JSON.stringify(resData));
		}
	)

	// res.status(200).send(req.body);
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

/*
*	[GET]: Admin ID
*	param: adminID
*/
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

/*
*	[GET]: Admin name
*	param: name
*/
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
});

/*
*	[GET]: Email
*	param: e-mail
*/
app.get('/admin/Email/:e-mail', function(req, res) {

	let values = [
		'employee_info',
		req.params.e-mail
	];

	connection.query(
		'SELECT * FROM ?? WHERE employee_mail = ?', values,
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

/*
*	[PUT]: Update
*	param: adminID
*/
app.put('/admin/:adminID', function(req, res){
	connection.query(
		'UPDATE employee_info SET  WHERE employee_id = ?', [req.params.adminID],
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

/*
*	[DELETE]: Delete
*	param: adminID
*/
app.delete('/admin/:adminID', function(req, res){
	connection.query(
		'UPDATE employee_info SET del_flg = 1 WHERE employee_id = ?', [req.params.adminID],
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}

			res.status(200).send({ msg: '削除完了' });
		}
	)
});