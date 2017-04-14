const DataQuery = require('../dao/repoAccess')
const getRepoInfo = require('../proxy/repoInfo').getAllLanguages

module.exports = function (gname) {
	return getRepoInfo(gname).then(arr => {
		return DataQuery.addRepoInfo(arr)
	}).then(arr=>{
		console.log(arr.length)
		return arr
	})
}