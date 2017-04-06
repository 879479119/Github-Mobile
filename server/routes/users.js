let express = require('express');

let router = express.Router();
let fetch = require('node-fetch');
let Promise = require('bluebird');
let log = require('../helper/logger');

router.post('/register', function (req, respond) {
	let github = global.github,
		code = req.body.code

	log(code)

	fetch("https://github.com/login/oauth/access_token",{
		method: 'POST',
		headers: {
			"Accept": "application/json",
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: "client_id="+global.config.clientID+"&client_secret="+global.config.clientSecret+"&code="+code
	}).then(res => res.json()).then(res => {
		return new Promise(function (resolve, reject) {
			log(res.access_token)
			/**
			 * authenticate is sync operation
			 */
			let token = res.access_token

			if(token === undefined){
				reject("undefined token")
			}

			github.authenticate({
				type: "oauth",
				token: token
			})

			github.users.get(
				{}, function (err, res) {
					if(err) reject("get user info error or timeout")
					resolve({res:res,token:token})
			})
		})
	}).then(function (obj) {
		console.log(JSON.stringify(obj.res, null, 2))
		return new Promise(function (resolve, reject) {
			global.connection.query("SELECT gid FROM t_user WHERE gid = ?",
				[obj.res.data.id],
				function (err, data) {
					if(err) console.error(err.message)
					else if(data.length >= 1){
						reject("user already stored")
					}else{
						resolve(obj)
					}
				})
		})
	}).then(function (obj) {
		return new Promise(function(resolve, reject){
			let key = Date.now()
			global.connection.query("INSERT INTO t_user VALUES (NULL,?,?,?,?)",
				[obj.res.data.id, key, obj.token, "admin"],
				function (err) {
					if(err){
						reject('DATABASE ERROR')
					}else{
						respond.cookie('gid',obj.res.data.id, { maxAge: 30*24*60*60*1000 })
						respond.cookie('key',key, { maxAge: 30*24*60*60*1000, httpOnly: true })
						respond.send("OK").end();
					}
				})
		})
	}).catch(e=>{
		if(e instanceof String){
			log(e,1)
			respond.send(e).end()
		}
		else {
			log(e,1)
			respond.send(e).end()
		}
	})

}).post('/login', function (req, respond) {
	let github = global.github,
		gid = req.cookies['gid'],
		key = req.cookies['key'];

	if(typeof key === "undefined" || typeof gid === "undefined"){
		respond.write("no key or gid in cookie")
		return
	}

	(new Promise(function (resolve, reject) {
		global.connection.query("SELECT token FROM t_user WHERE gid = ? AND `key` = ?",
			[gid, key],
			function (err, data) {
				if(err){
					reject("database error occurs when login")
				}else if(data.length !== 0){
					resolve(data[0].token)
				}else{
					reject("invalid key with gid")
				}
			})
	})).then(function (token) {
		github.authenticate({
			type: "oauth",
			token: token
		})
		respond.send("login success")
	}).catch(function (err) {
		log(err,1)
		respond.send(err)
	})
}).get('/redirect', function (req, res) {
	res.redirect("https://github.com/login/oauth/authorize?scope=admin&client_id="+global.config.clientID)
}).get('/test', (req, res) => {
	// let promise = new Promise(function (resolve, reject) {
	// 	global.connection.query("SELECT gid FROM t_user WHERE gid = ?",
	// 		[12726506],
	// 		function (err, data) {
	// 			if(err) console.error(err.message)
	// 			else if(data.length >= 1){
	// 				reject("user already stored")
	// 			}else{
	// 				resolve(1)
	// 			}
	// 		})
	// })
	// console.log(req.cookies['key'])
	// promise.then(data => {
	// 	console.log(data)
	// }).catch(err => {
	// 	console.error(err)
	// })
	res.send("123")
})

module.exports = router;