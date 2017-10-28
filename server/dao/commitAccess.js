const Promise = require('bluebird')
const basicQuery = require('./basicQuery')
const simpleQuery = require('./simpleQuery')
const stringify = require('../helper/stringify')

module.exports = {
  /**
   * store all the commits you provide in database
   * @param {Array} commitsArr
   */
  storeCommits(commitsArr) {
    const values = commitsArr.map((item) => {
      return `(${stringify(item)})`
    })
    const query = `INSERT INTO t_commits VALUES ${values.join(',')}`

    return new Promise(((resolve, reject) => {
      basicQuery(query, (err) => {
        if (err) reject(STDR.databaseError(err))
        else resolve(commitsArr)
      })
    }))
  },
  /**
   * get commit detail
   * @param {String} gname
   * @param {Array} [keys]
   */
  getCommitsByUser(gname, keys = []) {
    const values = keys.join(',') || '*'
    return new Promise(((resolve, reject) => {
      simpleQuery(`SELECT ${values} FROM t_commits WHERE git_name = ?`, [gname], (err, rows) => {
        if (err) reject(STDR.databaseError(err))
        else resolve(rows)
      })
    }))
  },
}
