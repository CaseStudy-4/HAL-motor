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
router.use(bodyParser.json());

/*
* 	login
*/
var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

router.use(passport.initialize());
router.use(session({ resave:false,saveUninitialized:false, secret: 'passport auction' }));
router.use(passport.session());

var user_id;
passport.use(new LocalStrategy(
  async function(username, password, done) {

		let connection
		try {
			connection = await mysql2.createConnection(db_setting);
			await connection.beginTransaction();
			const value = [
				username,
				password
			];
			const [row] = await connection.query('SELECT * FROM user_info WHERE user_name = ? AND user_pass = ?;', value);

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

router.post('/login', passport.authenticate('local'),function(req, res){
	console.log('login!!');
	res.status(200).send({'user_id' : user_id});
});

/* タイマー機能 
      GET /timer
      【リクエスト】
      【レスポンス】
      　200︓これからのオークションのjsonデータ
  */
router.get('/timer', function(req, res) {
	mysqlconnection.query(
		'SELECT * FROM auction_info;',
		(error, results) => {
			if (error) {
					console.log('error: ' + error.stack);
					res.status(405).send({ message: 'Error' });
					return;
			}
			var nowdate = new Date();
			var results1 = new Array();
			let ind = 0;
			for (let i = 0; i < results.length; i++) {
				if(nowdate.getTime() <= results[i].auction_date.getTime()){
					var addData =
				{ 
					auction_id : results[i].auction_id,
					auction_name : results[i].auction_name,
					auction_image : results[i].auction_image, 
					auction_date : results[i].auction_date,
					exhibition_block : results[i].exhibition_block
				}
				results1[ind] = addData;
				ind++;
				}
			}
			res.status(200).send(results1);
		}
	);
});


module.exports = router;