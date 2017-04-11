let Promise = require('bluebird')

function getAllLanguages(gname) {
	getAllRepo(gname).then((arr) => {
		let promises = arr.data.map(item => {
			let repo = item.name
			return new Promise((resolve, reject) => {
				global.github.repos.getLanguages({ owner: gname, repo },(err, res) => {
					if(err) reject(err)
					else {
						//noinspection JSUnresolvedVariable
						resolve({
							rid: item.id,
							gid: item.owner.id,
							git_name: item.owner.login,
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
							branch: item.default_branch
						})
					}
				})
			})
		})
		return Promise.all(promises)
	}).then(repos => {
		console.log(repos)
		return repos
	})
}

function getAllRepo(gname) {
	if(gname === undefined) return Promise.reject('YOU MUST PASS A ARGV')
	return new Promise((resolve, reject) => {
		global.github.repos.getForUser({ username: gname },(err, res) => {
			if(err) reject(err)
			else resolve(res)
		})
	})
}

module.exports = {
	getAllLanguages,
	getAllRepo
}