let express = require('express')
let router = express.Router()
let fetch = require('node-fetch')
let log = require('../helper/logger')
let login = require('../proxy/login')
let profileInit = require('../services/profile.init')
let commitInit = require('../services/commit.init')
let commitService = require('../services/commit.optimize')
let register = require('../services/register')
let getLang = require('../services/langInfo')
let syncAuth = require('../proxy/syncAuth')

router.post('/register', (req, respond)=>{

	let code = req.body.code
	log(code)

	register(code).then(({gid, gname, key})=>{
		log({gid, gname, key})
		respond.cookie('gid', gid, { maxAge: 30*24*60*60*1000 })
		respond.cookie('gname', gname, { maxAge: 30*24*60*60*1000 })
		respond.cookie('key',key, { maxAge: 30*24*60*60*1000, httpOnly: true })
		respond.send(STDR.success('register success'))
	}).catch(e=>{
		log(e,1)
		respond.send(STDR.argvError(e))
	})

}).post('/login', (req, respond)=>{
	let gid = req.cookies['gid'],
		gname = req.cookies['gname'],
		key = req.cookies['key'];

	if(typeof key === "undefined" || typeof gid === "undefined"){
		respond.send(STDR.headerError("no key or gid in cookie"))
		return
	}

	login(gid, key).then((token)=>{
		req.session.token = token
		respond.cookie('gid', gid, { maxAge: 30*24*60*60*1000 })
		respond.cookie('gname', gname, { maxAge: 30*24*60*60*1000 })
		respond.cookie('key',key, { maxAge: 30*24*60*60*1000, httpOnly: true })
		respond.send(STDR.success("login success"))
	}).catch((err)=>{
		log(err,1)
		respond.send(err)
	})
}).get('/redirect', (req, res)=>{
	res.redirect("https://github.com/login/oauth/authorize?scope=admin&client_id="+global.config.clientID)
}).get('/init', (req, res) => {
	let gname = req.query.name
	if(gname === undefined) {
		res.send(STDR.argvError("you should pass 'name'"))
		return
	}
	profileInit(gname).then((arr)=>{
		res.send(STDR.success(arr))
	}).catch(e=>{
		log(e, 1)
		res.send(e)
	})
}).get('/getLangInfo', (req, res)=>{
	let gname = req.query.name
	if(gname === undefined) {
		res.send(STDR.argvError("you should pass 'name'"))
		return
	}
	getLang(gname).then(countObj=>{
		res.send(STDR.success(countObj))
	}).catch(err=>{
		log(err, 1)
		res.send(err)
	})
}).get('/initCommits', (req, res) => {
	let gname = req.query.name
	if(gname === undefined) {
		res.send(STDR.argvError("you should pass 'name'"))
		return
	}

	syncAuth("0af36a9f7ed6c22d434ed27206365835b9faec28")

	commitInit(gname).then((arr)=>{
		res.send(STDR.success(arr))
	}).catch(e=>{
		log(e, 1)
		res.send(e)
	})
}).get('/getCommits', (req, res) => {
	let gname = req.query.name
	if(gname === undefined) {
		res.send(STDR.argvError("you should pass 'name'"))
		return
	}

	commitService(gname, ['repo_name', 'time']).then((arr)=>{
		res.send(STDR.success(arr))
	}).catch(e=>{
		log(e, 1)
		res.send(e)
	})
})

module.exports = router