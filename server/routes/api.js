let express = require('express')
let Promise = require('bluebird')
let router = express.Router()
let login = require('../proxy/login')

router.get('/', function(req, res) {
	res.send('you can use api like: /api/users/get to find your info').end()
}).get('/:route', function(req, res) {
	res.send('you can use api like: /api/users/get to find your info').end()
}).post('/:group/:action', function (req, respond) {
	let group = req.params.group,
		action = req.params.action,
		params = req.body || {}

	/**
	 * these APIs are all grouped by some name of the list
	 */
	if(["activity","authorization","enterprise","gists","gitdata","integrations", "issues",
			"migrations","misc","orgs","projects","pullRequests","reactions","repos","search","users"].indexOf(group) === -1){
		respond.send("the api you called is not supported yet")
		return
	}

	new Promise(function (resolve, reject) {
		global.github[group][action](params,function (err, res) {
			if(err) reject("no permission or timeout")
			else resolve(res)
		})
	}).then(function (res) {
		log(`API called: ${group} - ${action}`);
		respond.send(res)
	}).catch(function (err) {
		if(err instanceof TypeError){
			respond.send(STDR.argvError("there is no api like this"))
			return
		}
		log(err,1)
		respond.send(err)
	})
}).post('/auth/:group/:action', function (req, respond) {
	let group = req.params.group,
		action = req.params.action,
		params = req.body || {},
		gid = req.cookies['gid'],
		key = req.cookies['key']

	if(typeof key === "undefined" || typeof gid === "undefined"){
		respond.send(STDR.authError("no key or gid in cookie"))
		return
	}
	if(["activity","authorization","enterprise","gists","gitdata","integrations", "issues",
			"migrations","misc","orgs","projects","pullRequests","reactions","repos","search","users"].indexOf(group) === -1){
		respond.send("the api you called is not supported yet")
		return
	}

	login(gid, key).then(function () {
		return new Promise(function (resolve, reject) {
			global.github[group][action](params,function (err, res) {
				if(err) reject("no permission or timeout")
				else resolve(res)
			})
		})
	}).then(function (res) {
		log(`AUTH API called: ${group} - ${action}`);
		respond.send(res)
	}).catch(function (err) {
		log(err,1)
		respond.send(err)
	})
})

module.exports = router;
