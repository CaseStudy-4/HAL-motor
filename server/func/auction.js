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
passport.use("auctionlogin", new LocalStrategy(
  async function(username, password, done) {

		console.log('auction.js');

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

router.post('/login', passport.authenticate('auctionlogin', { session: true }),function(req, res){
	console.log('login!!');
	res.status(200).send({'user_id' : user_id});
	res.sendFile(__dirname + '../../hoge.ejs');
});

router.get('/login', function(req, res){
	res.sendFile(__dirname + '../../login.ejs');
});

router.post('/', async function(req, res){
	let connection
	try {
		connection = await mysql2.createConnection(db_setting)
		await connection.beginTransaction();
		const [row2] = await connection.query('INSERT INTO auction_info set ?', req.body);
		await connection.commit();
		res.json({
			status : "success",
			msg: '登録完了'
		});
	}catch(err){
		await connection.rollback();
    res.stat(401).json({
      status: "error",
      error: "fail to uplord data"
    })
	}finally {
		connection.end();
		return
	}
});

router.get('/', function(req, res){
	mysqlconnection.query(
		'SELECT * FROM auction_info;',
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

router.get('/:auction_id', function(req, res){
	let auctionID = parseInt(req.params.auction_id, 10);

	mysqlconnection.query(
		'SELECT * FROM auction_info WHERE auction_id = ?;', auctionID,
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}
			res.status(200).send(results);
		}
	)
});

router.use(bodyParser.urlencoded({
	extended: true
}));
router.use(bodyParser.json());
router.put('/:auction_id', function(req, res){

	let auctionID = parseInt(req.params.auction_id, 10);
	let put = req.body;

	mysqlconnection.query(
		'UPDATE auction_info SET ? WHERE auction_id = ?;', [put, auctionID],
		(error, results) => {
			if(error){
				console.log('Error!!' + error.stack);
				res.status(400).send({ msg: 'Error!!' });
				return;
			}

			res.status(200).send(results);
		}
	)
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