/**
 * configure for the qiniu CDN
 * @type {string}
 */
let qiniu = require("qiniu")
let config = require('../config/CDNConfig')
let path = require('path')
let fs = require("fs")

qiniu.conf.ACCESS_KEY = config.access_key
qiniu.conf.SECRET_KEY = config.secret_key
let bucket = config.bucket
let dist = config.dist;

function getToken(bucket, key) {
	let putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key)
	return putPolicy.token()
}

function uploadFile(upToken, key, localFile) {
	let extra = new qiniu.io.PutExtra()
	qiniu.io.putFile(upToken, key, localFile, extra, function(err, ret) {
		if(!err) {
			console.log("[ LOG ] ===> " + ret.key + "uploaded")
		} else {
			console.log(err)
		}
	});
}

function uploadKeys(dir, name= '') {
	let items = fs.readdirSync(dir)
	let keys = []

	for(let k of items){
		let curDir = dir + '/' + k
		let key = name + '/' + k
		let cur = fs.lstatSync(curDir)
		if(cur.isDirectory() === false) keys.push(key)
		else {
			keys = keys.concat(uploadKeys(curDir, key))
		}
	}

	if(keys) return keys
}

if(process.argv[1] === require.main.filename){
	//TODO: there must be a better way to find whether it's the main file
	let keys = uploadKeys(path.relative('./', dist))

	keys.map(item => {
		let key = config.prefix + item
		let filePath = path.relative('./', dist) + item
		let token = getToken(bucket, key)
		console.log(key,filePath,token)
		uploadFile(token, key, filePath)
	})
}

module.exports = uploadKeys