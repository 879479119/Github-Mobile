const DataQuery = require('../dao/userAccess')
const syncAuth = require('./syncAuth')

module.exports = function (gid, key) {
  return DataQuery.chkLogin(gid, key)
    .then((token) => {
      // TODO: catch auth error
      syncAuth(token)
      return token
    })
}
