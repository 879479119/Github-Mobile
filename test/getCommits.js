const GitHubApi = require('github')

github = new GitHubApi({
  debug: true,
  protocol: 'https',
  host: 'api.github.com', // should be api.github.com for GitHub
  headers: {
    'user-agent': 'trial', // GitHub is happy with a unique user agent
  },
  Promise: require('bluebird'),
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 20000,
})

const login = require('../server/proxy/syncAuth')

login('8d7da4f512874607e06cda1f6f484904cf77efb6')


const Promise = require('bluebird')

function getAllLanguages(gname) {
  getAllRepo(gname).then((arr) => {
    const promises = arr.data.map((item) => {
      const repo = item.name
      return new Promise((resolve, reject) => {
        global.github.repos.getLanguages({ owner: gname, repo }, (err, res) => {
          if (err) reject(err)
          else {
            // noinspection JSUnresolvedVariable
            resolve({
              rid: item.id,
              repo_name: repo,
              languages: res.data,
              description: item.description,
              forked: item.fork,
              created_time: item.created_at,
              updated_time: item.updated_at,
              lang_main: item.language,
              file_count: item.size,
              star: item.stargazers_count,
              watch: item.watchers,
              fork: item.forks,
              open_issue: item.open_issues_count,
              branch: item.default_branch,
            })
          }
        })
      })
    })
    return Promise.all(promises)
  }).then((repos) => {
    console.log(repos)
    return repos
  })
}

function getAllRepo(gname) {
  if (gname === undefined) return Promise.reject('YOU MUST PASS A ARGV')
  return new Promise((resolve, reject) => {
    global.github.repos.getForUser({ username: gname }, (err, res) => {
      if (err) reject(err)
      else resolve(res)
    })
  })
}

getAllLanguages('879479119')
