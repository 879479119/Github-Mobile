var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var Promise = require('bluebird');
var log = require('../helper/logger');

router.post('/register', function (req, respond) {
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
		.then(res=>{
			/**
			 * authenticate is sync operation
			 */
			var token = res.access_token

			if(token === undefined){
				respond.send("ERROR")
				Promise.reject("undefined token")
			}

			github.authenticate({
				type: "oauth",
				token: token
			})

			return new Promise(function (resolve, reject) {
				github.users.get({
				},function (err, res) {
					if(err) reject(err)
					resolve({res:res,token:token})
				});
			})
		}).then(function (obj) {
			console.log(JSON.stringify(obj.res, null, 2))
			var key = Date.now()
			global.connection.query("INSERT INTO t_user VALUES (NULL,?,?,?,?)",
				[obj.res.data.id, key, obj.token, "admin"],
				function (err) {
					respond.cookie('key',key, { maxAge: 900000, httpOnly: true })
					if(err){
						console.error(err.message)
						respond.send('DATABASE ERROR')
					}else{
						//noinspection JSCheckFunctionSignatures
						respond.send("OK");
					}
				})
		})
		.catch(e=>{
			log(e,1)
		})

}).post('/login', function (req, res) {
	var github = global.github,
		token = req.body.token
	github.authenticate({
		type: "oauth",
		token: token
	});
	res.send('OK');
}).get('/redirect', function (req, res) {
	res.redirect("https://github.com/login/oauth/authorize?scope=admin&client_id="+global.config.clientID)
})

module.exports = router;