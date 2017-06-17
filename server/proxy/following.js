let pagination = require('../helper/pagination')

/**
 * @param {String} gname
 * @return {Promise}
 */
function getAllFollowing(gname) {
	return pagination((page, callback)=>{
		return global.github.users.getFollowingForUser({ username: gname, per_page: 100, page },
			(err, res) => {
				callback(err, res.data)
			})
	}, 100, 1)
}

module.exports = {
	getAllFollowing
}