let express = require('express')
let router = express.Router()
let fetch = require('node-fetch')
let log = require('../helper/logger')
let login = require('../proxy/login')
let profileInit = require('../services/profileInit')
let register = require('../services/register')
let getLang = require('../services/langInfo')

router.post('/register', (req, respond)=>{

	let code = req.body.code
	log(code)

	register(code).then((gid, key)=>{
		respond.cookie('gid', gid, { maxAge: 30*24*60*60*1000 })
		respond.cookie('key',key, { maxAge: 30*24*60*60*1000, httpOnly: true })
		respond.send("OK").end();
	}).catch(e=>{
		log(e,1)
		respond.send(e).end()
	})

}).post('/login', (req, respond)=>{
	let gid = req.cookies['gid'],
		key = req.cookies['key'];

	if(typeof key === "undefined" || typeof gid === "undefined"){
		respond.write("no key or gid in cookie")
		return
	}

	login(gid, key).then((token)=>{
		if(token) respond.send("login success")
	}).catch((err)=>{
		log(err,1)
		respond.send(err)
	})
}).get('/redirect', (req, res)=>{
	res.redirect("https://github.com/login/oauth/authorize?scope=admin&client_id="+global.config.clientID)
}).get('/init', (req, res) => {
	let gname = req.query.name
	if(gname === undefined) {
		res.status(403)
		return
	}
	profileInit(gname).then((arr)=>{
		res.send(arr)
	}).catch(e=>{
		log(e, 1)
		res.send(e)
	})
}).get('/getLangInfo', (req, res)=>{
	getLang('879479119').then(countObj=>{
		res.send(countObj)
	}).catch(err=>{
		res.send("SOME THING WENT WRONG WHEN FETCH LANG DATA")
		log(err,1)
	})
})

module.exports = router