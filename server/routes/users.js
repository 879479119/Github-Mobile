var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var Promise = require('bluebird');
var log = require('../helper/logger');

router.post('/register', function (req, res) {
	var github = global.github,
		code = req.body.code

	log(code)

	fetch("https://github.com/login/oauth/access_token",{
		method: 'POST',
		headers: {
			"Accept": "application/json",
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: "client_id="+global.config.clientID+"&client_secret="+global.config.clientSecret+"&code="+code
	})
		.then(res => res.json())
		Promise.resolve()
		.then(res=>{
			/**
			 * authenticate is sync operation
			 */
			github.authenticate({
				type: "oauth",
				token: res.access_token
			})

			return new Promise(function (resolve, reject) {
				github.users.get({
				},function (err, res) {
					if(err) reject(err)
					resolve(res)
				});
			})
		}).then(function (res) {
			// console.log(JSON.stringify(res, null, 2))
			global.connection.query("INSERT INTO t_user VALUES (NULL,?,?,?,?)",
				[1,2,3,4],
				function (err) {
					if(err) console.error(err)
				})
		})
		.catch(e=>console.log(e))

	res.send('OK');
}).post('/login', function (req, res) {
	var github = global.github,
		token = req.body.token
	github.authenticate({
		type: "oauth",
		token: token || 'b14a6741eb3b4c904f484a6604590f099aa06008'
	});
	res.send('OK');
}).get('/redirect', function (req, res) {
	res.redirect("https://github.com/login/oauth/authorize?scope=admin&client_id="+global.config.clientID)
})

module.exports = router;