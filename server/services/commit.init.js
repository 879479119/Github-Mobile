const RepoQuery = require('../dao/repoAccess')
const CommitQuery = require('../dao/commitAccess')

const getAllCommits = require('../proxy/commits').getAllCommits

module.exports = function (gname) {
	return RepoQuery.getAllRepoByUser(gname).then((arr, rejectHook) => {
		//TODO: will this work? try it later
		if(arr.length === 0) rejectHook(STDR.success("no log",1))
		return getAllCommits(arr)
	})
}