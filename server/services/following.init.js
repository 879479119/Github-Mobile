/**
 * @author rocksama
 * @created 2017/6/12
 * @description
 */
const normalize = require('../helper/normalizer')
const FollowQuery = require('../dao/followAccess')
const { getAllFollowing } = require('../proxy/following')

module.exports = function (gname) {
  const query = FollowQuery.getAllFollowingByUser(gname)

  return query.then((arr) => {
    // the server has fetched the info we need
    if (arr.length > 0) return arr
    // fetch the information we need
    return getAllFollowing(gname).then((data) => {
      const result = []
      normalize(data, result)
      return FollowQuery.storeFollowing(gname, result)
    }).then((arr) => {
      // here is just a filter to keep the data same as that comes from database
      return arr.map(item => ({
        id: 0,
        git_name: gname,
        following_name: item.login,
        avatar_url: item.avatar_url,
      }))
    })
  })
}
