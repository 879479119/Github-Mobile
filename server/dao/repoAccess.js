let Promise = require('bluebird')
let basicQuery = require('./basicQuery')
let simpleQuery = require('./simpleQuery')
const stringify = require('../helper/stringify')

module.exports = {
	addRepoInfo(repoArr){
		let values = repoArr.map(item=>{
			return '('+stringify(item)+')'
		})
		let query = `INSERT INTO t_repo VALUES ${values.join(',')}`

		return new Promise(function(resolve, reject){
			basicQuery(query, (err)=>{
				if(err)	reject(STDR.databaseError(err))
				else resolve(repoArr)
			})
		})
	},
	getRepoInfo(gname, repo){
		return new Promise((resolve, reject)=>{
			simpleQuery('SELECT * FROM t_repo WHERE git_name = ? AND repo_name = ?',
				[gname, repo], (err, rows)=>{
				if(err)	reject(STDR.databaseError(err))
				else resolve(rows)
			})
		})
	},
	getAllRepoByUser(gname){
		return new Promise((resolve, reject)=>{
			simpleQuery('SELECT * FROM t_repo WHERE git_name = ?',
				[ gname ], (err, rows)=>{
					if(err)	reject(STDR.databaseError(err))
					else resolve(rows, reject)
				})
		})
	}
}
