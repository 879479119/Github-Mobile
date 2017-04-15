let Promise = require('bluebird')
let basicQuery = require('./basicQuery')
let simpleQuery = require('./simpleQuery')
const stringify = require('../helper/stringify')

module.exports = {
	/**
	 * store all the commits you provide in database
	 * @param {Array} commitsArr
	 */
	storeCommits(commitsArr){
		let values = commitsArr.map(item=>{
			return '('+stringify(item)+')'
		})
		let query = `INSERT INTO t_commits VALUES ${values.join(',')}`

		return new Promise(function(resolve, reject){
			basicQuery(query, err=>{
				if(err)	reject(STDR.databaseError(err))
				else resolve(commitsArr)
			})
		})
	},
	/**
	 * get commit detail
	 * @param {String} gname
	 * @param {Array} [keys]
	 */
	getCommitsByUser(gname, keys=[]){
		let values = keys.join(',') || '*'
		return new Promise(function(resolve, reject){
			simpleQuery(`SELECT ${values} FROM t_commits WHERE git_name = ?`, [gname], (err, rows)=>{
				if(err)	reject(STDR.databaseError(err))
				else resolve(rows)
			})
		})
	}
}