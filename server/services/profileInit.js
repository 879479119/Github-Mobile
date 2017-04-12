const DataQuery = require('../dao/repoAccess')
const getRepoInfo = require('../proxy/repoInfo').getAllLanguages
const syncAuth = require('../proxy/syncAuth')

module.exports = function (gname) {
	syncAuth('8d7da4f512874607e06cda1f6f484904cf77efb6')
	return getRepoInfo(gname).then(arr => {
		console.log('--------------->',arr)
		return DataQuery.addRepoInfo(arr)
	}).then(arr=>{
		console.log('----------------------------------------------');
		console.log(arr.length)
		return arr
	})
}