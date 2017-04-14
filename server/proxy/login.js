let DataQuery = require('../dao/userAccess')
let syncAuth = require('./syncAuth')

module.exports = function (gid, key) {
	return DataQuery.chkLogin(gid,key)
		.then(function (token) {
			//TODO: catch auth error
			syncAuth(token)
			return token
		})
}
