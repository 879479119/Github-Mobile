const express = require('express')
const log = require('../helper/logger')
const login = require('../proxy/login')
const profileInit = require('../services/profile.init')
const commitInit = require('../services/commit.init')
const commitService = require('../services/commit.optimize')
const register = require('../services/register')
const getLang = require('../services/langInfo')
const syncAuth = require('../proxy/syncAuth')
const followingInit = require('../services/following.init')
const { addFollowingForUser } = require('../dao/followAccess')

const router = express.Router()
router.post('/register', (req, respond) => {
  const { code } = req.body
  log(code)

  register(code).then(({ gid, gname, key }) => {
    log({ gid, gname, key })
    respond.cookie('gid', gid, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    respond.cookie('gname', gname, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    respond.cookie('key', key, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    respond.send(STDR.success('register success'))
  }).catch((e) => {
    log(e, 1)
    respond.send(STDR.argvError(e))
  })
}).post('/login', (req, respond) => {
  const { gid, gname, key } = req.cookies

  if (typeof key === 'undefined' || typeof gid === 'undefined') {
    respond.send(STDR.headerError('no key or gid in cookie'))
    return
  }

  login(gid, key).then((token) => {
    // store the login state
    req.session.token = token
    req.session.gname = gname

    // refresh the cookies
    respond.cookie('gid', gid, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    respond.cookie('gname', gname, { maxAge: 30 * 24 * 60 * 60 * 1000 })
    respond.cookie('key', key, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
    respond.send(STDR.success('login success'))
  }).catch((err) => {
    log(err, 1)
    respond.send(err)
  })
}).get('/redirect', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?scope=admin&client_id=${global.config.clientID}`)
}).get('/init', (req, res) => {
  const gname = req.query.name
  if (gname === undefined) {
    res.send(STDR.argvError("you should pass 'name'"))
    return
  }
  profileInit(gname).then((arr) => {
    res.send(STDR.success(arr))
  }).catch((e) => {
    log(e, 1)
    res.send(e)
  })
})
  .get('/getLangInfo', (req, res) => {
    const gname = req.query.name
    if (gname === undefined) {
      res.send(STDR.argvError("you should pass 'name'"))
      return
    }
    getLang(gname).then((countObj) => {
      res.send(STDR.success(countObj))
    }).catch((err) => {
      log(err, 1)
      res.send(err)
    })
  })
  .get('/initCommits', (req, res) => {
    const gname = req.query.name
    if (gname === undefined) {
      res.send(STDR.argvError("you should pass 'name'"))
      return
    }

    syncAuth('0af36a9f7ed6c22d434ed27206365835b9faec28')

    commitInit(gname).then((arr) => {
      res.send(STDR.success(arr))
    }).catch((e) => {
      log(e, 1)
      res.send(e)
    })
  })
  .get('/getCommits', (req, res) => {
    const gname = req.query.name
    if (gname === undefined) {
      res.send(STDR.argvError("you should pass 'name'"))
      return
    }

    commitService(gname, ['repo_name', 'time']).then((arr) => {
      res.send(STDR.success(arr))
    }).catch((e) => {
      log(e, 1)
      res.send(e)
    })
  })
  .post('/getFollowing', (req, res) => {
  // we will get the authorized user's info
    const gname = req.query.name || req.session.gname
    followingInit(gname).then((arr) => {
      res.send(STDR.success(arr))
    }).catch((e) => {
      log(e, 1)
      res.send(e)
    })
  })
  .post('/addFollowing', (req, res) => {
    const gname = req.body.name
    const following = req.body.follow

    addFollowingForUser(gname, following).then((arr) => {
      res.send(STDR.success(arr))
    }).catch((e) => {
      log(e, 1)
      res.send(e)
    })
  })

module.exports = router
