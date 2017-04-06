let Promise = require('bluebird')

module.exports = {
	/**
	 * @return {Object}
	 * @param obj
	 */
	chkUserExist(obj){
		return new Promise(function (resolve, reject) {
			global.connection.query("SELECT gid FROM t_user WHERE gid = ?",
				[obj.res.data.id],
				function (err, data) {
					if(err) reject(err.message)
					else if(data.length >= 1){
						reject("user already stored")
					}else{
						resolve(obj)
					}
				})
		})
	},
	/**
	 * @return access_token
	 * @param gid
	 * @param key
	 */
	chkLogin(gid, key){
		return new Promise(function (resolve, reject) {
			global.connection.query("SELECT token FROM t_user WHERE gid = ? AND `key` = ?",
				[gid, key],
				function (err, data) {
					if(err){
						reject("database error occurs when login")
					}else if(data.length !== 0){
						resolve(data[0].token)
					}else{
						reject("invalid key with gid")
					}
				})
		})
	},
	/**
	 * @return gid key
	 * @param gid
	 * @param token
	 * @param [scope]
	 */
	addUser(gid, token, scope){
		return new Promise(function(resolve, reject){
			let key = Date.now()
			global.connection.query("INSERT INTO t_user VALUES (NULL,?,?,?,?)",
				[gid, key, token, scope || "admin"],
				function (err) {
					if(err){
						reject('DATABASE ERROR')
					}else{
						resolve(gid, key)
					}
				})
		})
	}
}
