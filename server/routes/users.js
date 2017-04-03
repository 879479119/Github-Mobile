var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res) {
	var github = global.github,
		token = req.body.token
	github.authenticate({
		type: "oauth",
		token: token || 'b14a6741eb3b4c904f484a6604590f099aa06008'
	});
	res.send('OK');
}).post('/redirect', function (req, res) {
	res.redirect("https://github.com/login/oauth/authorize?scope=admin&client_id="+global.config.clientID)
})

module.exports = router;