let Promise = require('bluebird')
let simpleQuery = require('./simpleQuery')

module.exports = {
	/**
	 * @return {Object}
	 * @param obj
	 */
	chkUserExist(obj){
		return new Promise(function (resolve, reject) {
			simpleQuery("SELECT gid FROM t_user WHERE gid = ?",
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
			simpleQuery("SELECT token FROM t_user WHERE gid = ? AND `key` = ?",
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
			simpleQuery("INSERT INTO t_user VALUES (NULL,?,?,?,?)",
				[gid, key, token, scope || "admin"],
				function (err) {
					if(err){
						reject('DATABASE ERROR')
					}else{
						resolve(gid, key)
					}
				})
		})
	},
	/**
	 * get the language information about a user
	 * @param gname
	 * @param gid
	 * @return {string}
	 */
	getLangInfo(gname, gid){
		if(gid !== undefined){
			return new Promise((resolve, reject) => {
				simpleQuery("SELECT languages FROM t_repo WHERE gid = ?",
					[gid],
					(err, rows) => {
						if(err) reject('DATABASE ERROR: Cannot fetch lang info with gid')
						else resolve(rows)
					})
			})
		}else{
			if(gname === undefined)	return "github name is undefined"
			return new Promise((resolve, reject) => {
				simpleQuery("SELECT languages FROM t_repo WHERE git_name = ?",
					[gname],
					(err, rows) => {
						if(err) reject('DATABASE ERROR: Cannot fetch lang info with gname')
						else resolve(rows)
					})
			})
		}
	}
}
