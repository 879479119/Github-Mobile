let Promise = require('bluebird')
let basicQuery = require('./basicQuery')
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
	}
}
