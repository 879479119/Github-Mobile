/**
 * @author rocksama
 * @created 2017/6/17
 * @description
 */
let Promise = require('bluebird')
let basicQuery = require('./basicQuery')
let simpleQuery = require('./simpleQuery')
const stringify = require('../helper/stringify')

module.exports = {
	addFollowingForUser(gname, userInfo){
		return new Promise(function(resolve, reject){
			simpleQuery('INSERT INTO t_following (NULL, ? , ? , ?)',
				...userInfo, (err)=>{
				if(err)	reject(STDR.databaseError(err))
				else resolve(100)
			})
		})
	},
	//get all the following people of user
	getAllFollowingByUser(gname){
		return new Promise((resolve, reject) => {
			simpleQuery('SELECT * FROM t_following WHERE git_name = ?',
				[ gname ], (err, rows)=>{
					if(err)	reject(STDR.databaseError(err))
					else resolve(rows, reject)
				})
		})
	},
	storeFollowing(gname, arr){
		let values = arr.map(item=>{
			return formatFollowing(gname, item)
		})
		let query = `INSERT INTO t_following VALUES ${values.join(',')}`

		return new Promise(function(resolve, reject){
			basicQuery(query, (err)=>{
				if(err)	reject(STDR.databaseError(err))
				else resolve(arr)
			})
		})
	}
}

//SQL joint
function formatFollowing(gname, item) {
	let vals = [
		gname,
		item.login,
		item.avatar_url
	]
	let k = vals.map(t => `"${t}"`)
	k.unshift('NULL')
	return '(' + k.join(',') + ')'
}