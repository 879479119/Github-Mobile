let colors = require('colors');

module.exports = (function () {
	return function (str, tag) {
		let color = "blue"
		switch (tag){
			case 1:
				color = "red"
				console.error("\u001b[31m[ ERROR ] ==> \u001b[39m" , str)
				break
			default:
				color = "green"
				console.log("\u001b[36m[ LOG ] ==> \u001b[39m" , str)
		}
		return true
	}
})(process.env.NODE_ENV)