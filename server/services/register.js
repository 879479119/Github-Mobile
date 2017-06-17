let login = require('../proxy/login')
let syncAuth = require('../proxy/syncAuth')
let DataQuery = require('../dao/userAccess')

module.exports = function (code) {
	return fetch("https://github.com/login/oauth/access_token",{
		method: 'POST',
		headers: {
			"Accept": "application/json",
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: "client_id="+global.config.clientID+"&client_secret="+global.config.clientSecret+"&code="+code
	}).then(res => res.json()).then(res => {
		return new Promise(function (resolve, reject) {
			log(res.access_token)
			/**
			 * authenticate is sync operation
			 */
			let token = res.access_token

			if(token === undefined){
				reject("Wrong code given")
			}

			syncAuth(token)

			global.github.users.get({},
				function (err, res) {
					if(err) reject("get user info error or timeout")
					resolve({res:res,token:token})
				})
		})
	}).then(function (obj) {
		return DataQuery.chkUserExist(obj)
	}).then(function (obj, exist) {
		if(exist === true) return {
			gid: obj.res.data.id,
			gname: obj.res.data.name,
			key: obj.token
		}
		return DataQuery.addUser(obj.res.data.id, obj.res.data.username, obj.token)
	})
}