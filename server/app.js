var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var GitHubApi = require("github");
var routes = require('./routes/index');
var user = require('./routes/users');
var api = require('./routes/api');
global.config = require('./config');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * initialize the github kit
 */

global.github = new GitHubApi({
	debug: true,
	protocol: "https",
	host: "api.github.com", // should be api.github.com for GitHub
	headers: {
		"user-agent": "trial" // GitHub is happy with a unique user agent
	},
	Promise: require('bluebird'),
	followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
	timeout: 10000
});

app.use('/api', api);
app.use('/user', user);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
