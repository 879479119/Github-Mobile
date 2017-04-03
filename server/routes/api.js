var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.send('you can use api like: /api/users/get to find your info').end()
}).get('/:route', function(req, res) {
	res.send('you can use api like: /api/users/get to find your info').end()
}).get('/:group/:action', function (req, res) {
	var group = req.params.group,
		action = req.params.action
	res.send({
		a: group,
		b: action
	}).end()
})

module.exports = router;
