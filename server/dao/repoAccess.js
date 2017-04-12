let Promise = require('bluebird')
const stringify = require('../helper/stringify')

module.exports = {
	addRepoInfo(repoArr){
		let values = repoArr.map(item=>{
			return '('+stringify(item)+')'
		})
		let query = `INSERT INTO t_repo VALUES ${values.join(',')}`
		console.error(query)
		return new Promise(function(resolve, reject){
			global.connection.query(query, (err)=>{
				if(err){
					reject('DATABASE ERROR , Details: '+err)
				}else{
					resolve(repoArr)
				}
			})
		})
	}
}
