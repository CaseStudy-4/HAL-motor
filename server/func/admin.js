
var router = require("express").Router();
const bodyParser = require('body-parser');
const app2 = require('../app2');
const mysqlconnection = app2.connection;
const cors = require('cors');
const mysql2 = require('mysql2/promise');

const db_setting = {
	host: '127.0.0.1',
  user: 'root',
  password: '',
  port: '3306',
  database: 'halmotor'
}

router.use(cors({ origin: true, credentials: true }));
router.use(bodyParser.urlencoded({
	extended: true
}));

/*
* 	login
*/
let adminmail = 'admin@hal.ac.jp';
let adminpass = 'admin';
let username = 'Seima Yonesho';
var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

router.use(passport.initialize());
router.use(session({ resave:false,saveUninitialized:false, secret: 'passport test' }));
router.use(passport.session());

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

router.post('/login', passport.authenticate('local'),function(req, res){
	console.log('login!!');
	res.status(200).send({'username' : username});
});

/*
*	POST request
*/
router.use(bodyParser.json());
router.post('/', async function(req,res) {

	let connection
	try {
		connection = await mysql2.createConnection(db_setting)
		await connection.beginTransaction();
		const [row1] = await connection.query('SELECT COUNT(*) AS count FROM employee_info');
		const values = {
			employee_id : 10001 + row1[0].count,
			employee_name : req.body.employee_name,
			employee_mail : req.body.employee_mail,
			employee_pass : req.body.employee_pass,
			employee_phone : req.body.employee_phone
		}
		console.log(values);
		const [row2] = await connection.query('INSERT INTO employee_info set ?', values);
		await connection.commit();
		res.json({
			status : "success",
			msg: '登録完了'
		});
	}catch(err){
		await connection.rollback();
    res.json({
      status: "error",
      error: "fail to uplord data"
    })
	}finally {
		connection.end();
		return
	}
});

/*
*   GET request
*/
router.get('/', function(req, res) {
	mysqlconnection.query(
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
router.get('/AdminID/:adminID', function(req, res) {

	let adminID = parseInt(req.params.adminID, 10);

	let values = [
		'employee_info',
		adminID
	];

	mysqlconnection.query(
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
router.get('/Adminame/:name', function(req, res) {

	let values = [
		'employee_info',
		req.params.name
	];

	mysqlconnection.query(
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
router.get('/Email/:e-mail', function(req, res) {

	let values = [
		'employee_info',
		req.params.e-mail
	];

	mysqlconnection.query(
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
/*
router.put('/:adminID', function(req, res){
	mysqlconnection.query(
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
*/

/*
*	[DELETE]: Delete
*	param: adminID
*/
router.delete('/:adminID', function(req, res){
	mysqlconnection.query(
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

module.exports = router;