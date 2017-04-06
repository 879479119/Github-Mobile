module.exports = function (token) {
	global.github.authenticate({
		type: "oauth",
		token: token
	})
}