let Promise = require('bluebird')
let time2date = require('../helper/time2date')

function dataFilter(data, repo_name) {
	if(data.length === 0) return null
	return data.map((item, index)=>{
		let obj = {
			sha: item.sha,
			tree: item.commit.tree.sha,
			message: item.commit.message,
			parents: item.parents.map(t=>t.sha).join(','),
			time: time2date(item.commit.committer.date),
			git_name: item.committer.login,
			repo_name
		}

		return obj
	})
}

function getAllCommits(arr) {
	return Promise.resolve(arr).then((arr) => {
		let promises = arr.map(item => {
			let repo = item.repo_name,
				author = item.git_name
			return new Promise((resolve, reject) => {
				global.github.repos.getCommits({ owner: author, repo, per_page: 100, page: 1 },
					(err, res) => {
					if(err) reject(STDR.networkError(err))
					else resolve(dataFilter(res, repo))
				})
			})
		})
		return Promise.all(promises)
	}).then(repos => {
		console.log(repos.length)
		return repos
	})
}

module.exports = {
	getAllLanguages,
	getAllRepo,
	getAllCommits
}