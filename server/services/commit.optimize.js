const CommitQuery = require('../dao/commitAccess')

module.exports = function (gname, keys) {
	return CommitQuery.getCommitsByUser(gname, keys)
}