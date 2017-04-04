var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(404).end();
  console.log(123)
});

module.exports = router;
