let express = require('express');
let path = require('path');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let GitHubApi = require("github");
let routes = require('./routes/index');
let user = require('./routes/users');
let api = require('./routes/api');
let mysql = require('mysql');
let session = require('express-session');
let Promise = require('bluebird');
let fetch = require('node-fetch');
let tty = require("tty");
let STDR = require('./STDRespond');

let app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({
	secret: 'github',
	name: 'sid',
	resave: false,
	saveUninitialized: true
}));

/**
 * initialize the logger tool
 * @global
 */

global.config = require('./config')
global.log = require('./helper/logger')
global.Promise = Promise
global.fetch = fetch
global.STDR = STDR

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
	timeout: 30000
});

/**
 * initialize the connection with MySQL
 */

global.pool = mysql.createPool(global.config.mysql);

/**
 * when to stop it ? listen the process exit event ?
 */
// global.connection.connect();

app.use('/api', api);
app.use('/', routes);
app.use('/user', user);

app.use(function(req, res, next) {
  // let err = new Error('Not Found');
  // err.status = 404;
  // next(err);
	res.send({code: 404,msg: "Not Found"})
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;

/**
 * catch all the exceptions and release resources
 */
process.on('uncaughtException', function () {
	//release the mysql connection if we need
	log('exit with uncaughtException',1)
})
process.on('exit', function(){
	log('exit peaceful')
})
process.openStdin().on("keypress", function(chunk, key) {
	if(key && key.name === "c" && key.ctrl) {
		log('exit peaceful')
		process.exit()
	}
})