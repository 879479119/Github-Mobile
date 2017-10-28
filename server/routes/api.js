const express = require('express')
const Promise = require('bluebird')

const router = express.Router()
const login = require('../proxy/login')

router.get('/', (req, res) => {
  res.send('you can use api like: /api/users/get to find your info').end()
}).get('/:route', (req, res) => {
  res.send('you can use api like: /api/users/get to find your info').end()
}).post('/:group/:action', (req, respond) => {
  const { group, action } = req.params
  const params = req.body || {}

  /**
   * these APIs are all grouped by some name of the list
   */
  if (['activity', 'authorization', 'enterprise', 'gists', 'gitdata', 'integrations', 'issues',
    'migrations', 'misc', 'orgs', 'projects', 'pullRequests', 'reactions', 'repos', 'search', 'users'].indexOf(group) === -1) {
    respond.send('the api you called is not supported yet')
    return
  }

  new Promise(((resolve, reject) => {
    global.github[group][action](params, (err, res) => {
      if (err) reject(STDR.networkError('no permission or timeout'))
      else resolve(res)
    })
  })).then((res) => {
    log(`API called: ${group} - ${action}`)
    respond.send(STDR.success(res))
  }).catch((err) => {
    if (err instanceof TypeError) {
      respond.send(STDR.argvError('there is no api like this'))
      return
    }
    log(err, 1)
    respond.send(err)
  })
}).post('/auth/:group/:action', (req, respond) => {
  const { group, action } = req.params.group
  const params = req.body || {}
  const { gid, key } = req.cookies

  if (typeof key === 'undefined' || typeof gid === 'undefined') {
    respond.send(STDR.authError('no key or gid in cookie'))
    return
  }
  if (['activity', 'authorization', 'enterprise', 'gists', 'gitdata', 'integrations', 'issues',
    'migrations', 'misc', 'orgs', 'projects', 'pullRequests', 'reactions', 'repos', 'search', 'users'].indexOf(group) === -1) {
    respond.send('the api you called is not supported yet')
    return
  }

  login(gid, key).then(() => {
    return new Promise(((resolve, reject) => {
      global.github[group][action](params, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    }))
  }).then((res) => {
    log(`AUTH API called: ${group} - ${action}`)
    respond.send(res)
  }).catch((err) => {
    log(err, 1)
    respond.send(err)
  })
})
  .post('/modified/:group/:action', (req, respond) => {
    const { group, action } = req.params.group
    const params = req.body || {}

    if (group === 'repos' && action === 'readme') {
      fetch(`https://api.github.com/repos/${params.owner}/${params.repo}/readme`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/vnd.github.VERSION.html',
        },
      })
        .then(e => e.text())
        .then((res) => {
          log(`AUTH API called: Modified ~ ${group} - ${action}`)
          // let base64 = res.content
          // let buffer = new Buffer(base64, 'base64')
          respond.send(STDR.success({ readme: res }))
        }).catch((err) => {
          log(err, 1)
          respond.send(STDR.uncaughtError(err))
        })
      return 0
    }

    respond.send(STDR.argvError('Wrong link'))
  })

module.exports = router
