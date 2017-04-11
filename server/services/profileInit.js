const Promise = require('bluebird')
const DataQuery = require('../dao/repoAccess')
const getRepoInfo = require('../proxy/repoInfo').getAllLanguages

module.exports = function (gname) {
	getRepoInfo(gname).then(arr => {
		DataQuery.addRepoInfo(arr)
	}).then(arr=>{
		console.log(arr.length)
	})
	return 0
}