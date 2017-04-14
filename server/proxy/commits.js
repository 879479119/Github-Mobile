let Promise = require('bluebird')
let time2date = require('../helper/time2date')
let pagination = require('../helper/pagination')

function dataFilter(data, repo_name) {
	if(data.length === 0) return null
	return data.map(item=>({
		sha: item.sha,
		tree: item.commit.tree.sha,
		message: item.commit.message,
		parents: item.parents.map(t=>t.sha).join(','),
		time: time2date(item.commit.committer.date),
		git_name: item.committer.login,
		repo_name
	}))
}

/**
 * since we cannot get pagination from the sdk, we can fix it
 * by using recursion or modify our own request
 */

function pp(author, repo) {
	return pagination((page, callback)=>{
		log({repo, page})
		global.github.repos.getCommits({ owner: author, repo, per_page: 80, page },
			(err, res) => {
				log(dataFilter(res.data, repo).length)
				callback(err, dataFilter(res.data, repo))
			})
	}, 100, 1)
}

/**
 * @param {Array} arr
 * @return {Promise}
 */
function getAllCommits(arr) {
	return Promise.resolve(arr).then((arr) => {
		let promises = arr.map(item => {
			let repo = item.repo_name,
				author = item.git_name
			return pp(author, repo)
		})
		log(promises.length)
		return Promise.all(promises)
	}).then(repos => {
		log(repos.length)
		return repos
	})
}

module.exports = {
	getAllCommits
}