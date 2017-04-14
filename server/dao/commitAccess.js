let Promise = require('bluebird')
let simpleQuery = require('./simpleQuery')
const stringify = require('../helper/stringify')

module.exports = {
	commits(repoArr){
		let values = repoArr.map(item=>{
			return '('+stringify(item)+')'
		})
		let query = `INSERT INTO t_repo VALUES ${values.join(',')}`

		return new Promise(function(resolve, reject){
			simpleQuery(query, (err)=>{
				if(err){
					reject('DATABASE ERROR , Details: '+err)
				}else{
					resolve(repoArr)
				}
			})
		})
	}
}