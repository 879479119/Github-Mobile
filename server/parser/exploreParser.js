const cheerio = require('cheerio')
const fs = require('fs')
const Promise = require('bluebird')

/**
 * fetch data from html or passing argv
 * @param [html]
 * @return {Object} the data we crawl
 */
function getExploreData(html) {
	let source = html
	new Promise(function (resolve, reject) {
		if(html === undefined){
			fs.readFile("../store/explore.html", "utf8", function (err, data) {
				if(err) reject("cannot read file: " + err.message)
				else resolve(source = data)
			})
		}else {
			resolve(source)
		}
	}).then(function (source) {
		let $ = cheerio.load(source)
		console.log($("body").length)
	}).catch(function (e) {
		console.error(e)
	})

}

module.exports = getExploreData

getExploreData()