const DataQuery = require('../dao/repoAccess')
const getRepoInfo = require('../proxy/repoInfo').getAllLanguages

module.exports = (gname) => {
  return getRepoInfo(gname).then((arr) => {
    return DataQuery.addRepoInfo(arr)
  }).then((arr) => {
    return arr
  })
}
