const Promise = require('bluebird')
const simpleQuery = require('./simpleQuery')

module.exports = {
  /**
   * @return {Object}
   * @param {Object} obj
   */
  chkUserExist(obj) {
    return new Promise(((resolve, reject) => {
      simpleQuery(
        'SELECT gid FROM t_user WHERE gid = ?',
        [obj.rs.data.id],
        (err, data) => {
          if (err) reject(STDR.databaseError(err))
          else if (data.length >= 1) {
            resolve(obj, true)
          } else {
            resolve(obj)
          }
        },
      )
    }))
  },
  /**
   * @return access_token
   * @param {String} gid
   * @param {String} key
   */
  chkLogin(gid, key) {
    return new Promise(((resolve, reject) => {
      simpleQuery(
        'SELECT token FROM t_user WHERE gid = ? AND `key` = ?',
        [gid, key],
        (err, data) => {
          if (err) {
            reject(STDR.databaseError(err))
          } else if (data.length !== 0) {
            resolve(data[0].token)
          } else {
            reject(STDR.authError('invalid key with gid'))
          }
        },
      )
    }))
  },
  /**
   * @param {String} gid
   * @param {String} gname
   * @param {String} token
   * @param {String} [scope]
   */
  addUser(gid, gname, token, scope) {
    return new Promise((resolve, reject) => {
      const key = Date.now()
      simpleQuery(
        'INSERT INTO t_user VALUES (NULL,?,?,?,?,?,NULL)',
        [gid, gname, key, token, scope || 'admin'],
        (err) => {
          if (err) {
            reject(STDR.databaseError(err))
          } else {
            resolve({ gid, gname, key })
          }
        },
      )
    })
  },
  /**
   * get the language information about a user
   * @param {String} gname
   * @param {String} [gid]
   * @return {String}
   */
  getLangInfo(gname, gid) {
    if (gid !== undefined) {
      return new Promise((resolve, reject) => {
        simpleQuery(
          'SELECT languages FROM t_repo WHERE gid = ?',
          [gid],
          (err, rows) => {
            if (err) reject(STDR.databaseError(err))
            else resolve(rows)
          },
        )
      })
    } else {
      if (gname === undefined) return 'github name is undefined'
      return new Promise((resolve, reject) => {
        simpleQuery(
          'SELECT languages FROM t_repo WHERE git_name = ?',
          [gname],
          (err, rows) => {
            if (err) reject(STDR.databaseError(err))
            else resolve(rows)
          },
        )
      })
    }
  },
  /**
   * store the language info in mysql
   * @param {String} gname
   * @param {Object} langObj
   */
  storeLangInfo(gname, langObj) {
    const langStr = JSON.stringify(langObj)
    log(langStr.length)
    return new Promise((resolve, reject) => {
      simpleQuery(
        'UPDATE t_user SET languages = ? WHERE git_name = ?',
        [langStr, gname],
        (err) => {
          if (err) reject(STDR.databaseError(err))
          else resolve(langObj)
        },
      )
    })
  },
}
