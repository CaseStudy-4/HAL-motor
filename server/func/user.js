var router = require("express").Router();
const bodyParser = require('body-parser');
const app2 = require('../app2');
const mysqlconnection = app2.connection;
const cors = require('cors');
const mysql2 = require('mysql2/promise');
var path = require('path');

const db_setting = {
	host: '127.0.0.1',
  user: 'root',
  password: '',
  port: '3306',
  database: 'halmotor'
}

router.use(bodyParser.urlencoded({
  extended: true
}));
router.use(bodyParser.json());

/*
* 	login
*/
var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

router.use(cors({ origin: true, credentials: true }));
router.use(passport.initialize());
router.use(session({ resave:false,saveUninitialized:false, secret: 'passport auction' }));
router.use(passport.session());

var user_id;
passport.use("userlogin", new LocalStrategy(
	async function(username, password, done) {

		let connection
		try {
			connection = await mysql2.createConnection(db_setting);
			await connection.beginTransaction();
			const value = [
				username,
				password
			];
			const [row] = await connection.query('SELECT * FROM user_info WHERE user_mail = ? AND user_pass = ?;', value);

			if(row.length == 0){
				return done(null, false, { message : 'ログインできませんでした' });
			}
			else if(row.length >= 1){
				user_id = row[0].user_id;
				return done(null, username);
			}
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
  }
));

passport.serializeUser(function(user, done) {
  done(null, username);
});

passport.deserializeUser(function(user, done) {
  done(null, username);
});

/*
router.get('/login', function(req, res){
	res.sendFile(path.resolve('../view/user_login.html'));
});
*/

router.post('/login', passport.authenticate('userlogin'),function(req, res){
	console.log('login!!');
	res.status(200).send({'user_id' : user_id});
});

router.post('/', (req, res) => {
  let values = [
		req.body.user_pass,
		req.body.user_name,
		req.body.user_mail,
		req.body.zip_code,
		req.body.address,
		req.body.tel
	];
	mysqlconnection.query(
    "INSERT INTO user_info (user_pass,user_name,user_mail,zip_code,address,tel) VALUES (?,?,?,?,?,?);",values,
    (error, results,fields) => {
      if (error) {
        console.log('error: ' + error.stack);
        res.status(405).send({ message: '登録失敗' });
        return;
      }
      mysqlconnection.query(
        "SELECT user_id FROM user_info WHERE user_pass = ? AND user_name = ? AND user_mail = ? AND zip_code = ? AND address = ? AND tel = ?;",values,
        (error, results,fields) => {
          if (error) {
            console.log('error: ' + error.stack);
            res.status(405).send({ message: '登録失敗' });
            return;
          }
					res.status(200).send(results);
        }
      );
    }
  );
});

router.get('/', (req, res) => {
	mysqlconnection.query(
		'SELECT * FROM user_info;',
		(error, results) => {
			if (error) {
					console.log('error: ' + error.stack);
					res.status(405).send({ message: 'Error' });
					return;
			}
			res.status(200).send(results);
		}
	);
});

router.get('/:userID', function(req, res) {
	mysqlconnection.query(
		'SELECT * FROM user_info WHERE user_id = ?;', req.params.userID,
		(error, results) => {
			if (error) {
					console.log('error: ' + error.stack);
					res.status(405).send({ message: 'Error' });
					return;
			}
			res.status(200).send(results);
		}
	);
});

router.get('/Username/:username', function(req, res) {
	mysqlconnection.query(
		'SELECT * FROM user_info WHERE user_name = ?;', req.params.username,
		(error, results) => {
			if (error) {
					console.log('error: ' + error.stack);
					res.status(405).send({ message: 'Error' });
					return;
			}
			res.status(200).send(results);
		}
	);
});

router.get('/Email/:e_mail', function(req, res) {
	mysqlconnection.query(
		'SELECT * FROM user_info WHERE user_mail = ?;', req.params.e_mail,
		(error, results) => {
			if (error) {
					console.log('error: ' + error.stack);
					res.status(405).send({ message: 'Error' });
					return;
			}
			res.status(200).send(results);
		}
	);
});

router.put('/:userID', function(req, res) {
	let id = req.params.userID;
	let values = [
		req.body.user_pass,
		req.body.user_name,
		req.body.user_mail,
		req.body.zip_code,
		req.body.address,
		req.body.tel
	];

	mysqlconnection.query(
		"UPDATE user_info SET user_pass = ?,user_name = ?,user_mail = ?,zip_code = ?,address = ?,tel = ? WHERE  user_id = "+id+";",values,
		(error, results,fields) => {
				if (error) {
						console.log('error: ' + error.stack);
						res.status(405).send({ message: '更新失敗' });
						return;
				}
				res.status(200).send({ message: '更新成功' });
		}
	);
});

router.delete('/:userID', function(req, res) {
	mysqlconnection.query(
		'DELETE  FROM  user_info WHERE user_id = ?;', req.params.userID,
		(error, results) => {
			if (error) {
				console.log('error: ' + error.stack);
				res.status(405).send({ message: '削除失敗' });
				return;
			}
			res.status(200).send({ message: '削除成功' });
		}
	);
});

module.exports = router;