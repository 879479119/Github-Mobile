const CommitQuery = require('../dao/commitAccess')

module.exports = (gname, keys) => {
  return CommitQuery.getCommitsByUser(gname, keys)
}
