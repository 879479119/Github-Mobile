let express = require('express')
let Promise = require('bluebird')
let router = express.Router()

router.get('/', function(req, res) {
	res.send('you can use api like: /api/users/get to find your info').end()
}).get('/:route', function(req, res) {
	res.send('you can use api like: /api/users/get to find your info').end()
}).post('/:group/:action', function (req, respond) {
	let group = req.params.group,
		action = req.params.action,
		params = req.body || {};

	/**
	 * these APIs are all grouped by some name of the list
	 */
	if(!(group in ["activity","authorization","enterprise","gists","gitdata","integrations", "issues",
			"migrations","misc","orgs","projects","pullRequests","reactions","repos","search","users"])){
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
		log(err,1)
		respond.send(err)
	})
})

module.exports = router;
