/**
 * @author rocksama
 * @created 2017/6/17
 * @description
 */
const Promise = require('bluebird')
const basicQuery = require('./basicQuery')
const simpleQuery = require('./simpleQuery')

module.exports = {
  addFollowingForUser(gname, userInfo) {
    return new Promise(((resolve, reject) => {
      simpleQuery(
        'INSERT INTO t_following (NULL, ? , ? , ?)',
        ...userInfo, (err) => {
          if (err) reject(STDR.databaseError(err))
          else resolve(100)
        },
      )
    }))
  },
  // get all the following people of user
  getAllFollowingByUser(gname) {
    return new Promise((resolve, reject) => {
      simpleQuery(
        'SELECT * FROM t_following WHERE git_name = ?',
        [gname], (err, rows) => {
          if (err) reject(STDR.databaseError(err))
          else resolve(rows, reject)
        },
      )
    })
  },
  storeFollowing(gname, arr) {
    const values = arr.map((item) => {
      return formatFollowing(gname, item)
    })
    const query = `INSERT INTO t_following VALUES ${values.join(',')}`

    return new Promise(((resolve, reject) => {
      basicQuery(query, (err) => {
        if (err) reject(STDR.databaseError(err))
        else resolve(arr)
      })
    }))
  },
}

// SQL joint
function formatFollowing(gname, item) {
  const vals = [
    gname,
    item.login,
    item.avatar_url,
  ]
  const k = vals.map(t => `"${t}"`)
  k.unshift('NULL')
  return `(${k.join(',')})`
}
