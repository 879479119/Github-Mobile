const syncAuth = require('../proxy/syncAuth')
const DataQuery = require('../dao/userAccess')

module.exports = (code) => {
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `client_id=${global.config.clientID}&client_secret=${global.config.clientSecret}&code=${code}`,
  }).then(res => res.json()).then((res) => {
    return new Promise(((resolve, reject) => {
      log(res.access_token)
      /**
       * authenticate is sync operation
       */
      const token = res.access_token

      if (token === undefined) {
        reject(new Error('Wrong code given'))
      }

      syncAuth(token)

      global.github.users.get(
        {},
        (err, rs) => {
          if (err) reject(new Error('get user info error or timeout'))
          resolve({ rs, token })
        },
      )
    }))
  }).then((obj) => {
    return DataQuery.chkUserExist(obj)
  })
    .then((obj, exist) => {
      if (exist === true) {
        return {
          gid: obj.rs.data.id,
          gname: obj.rs.data.name,
          key: obj.token,
        }
      }
      return DataQuery.addUser(obj.rs.data.id, obj.rs.data.username, obj.token)
    })
}
