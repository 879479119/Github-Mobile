const Promise = require('bluebird')
const time2date = require('../helper/time2date')
const pagination = require('../helper/pagination')

function dataFilter(data, repoName) {
  if (data.length === 0) return []
  // noinspection JSUnusedGlobalSymbols
  return data.map(item => ({
    sha: item.sha,
    repoName,
    git_name: item.committer.login,
    time: time2date(item.commit.committer.date),
    message: item.commit.message,
    tree: item.commit.tree.sha,
    parents: item.parents.map(t => t.sha).join(','),
  }))
}

/**
 * since we cannot get pagination from the sdk, we can fix it
 * by using recursion or modify our own request
 */

function pp(author, repo) {
  return pagination((page, callback) => {
    log({ repo, page })
    global.github.repos.getCommits(
      {
        owner: author, repo, author, per_page: 90, page,
      },
      (err, res) => {
        log('OK????')
        log(dataFilter(res.data, repo).length)
        log('OK!!!!')
        callback(err, dataFilter(res.data, repo))
      },
    )
  }, 90, 1)
}

/**
 * @param {Array} arr
 * @return {Promise}
 */
function getAllCommits(arr) {
  return Promise.resolve(arr).then((res) => {
    const promises = res.map((item) => {
      const repo = item.repo_name
      const author = item.git_name
      return pp(author, repo)
    })
    log('prepare =====>', promises.length)
    return Promise.all(promises)
  }).then((res) => {
    log('ready =====> ', res.length)
    return res
  })
}

module.exports = {
  getAllCommits,
}
