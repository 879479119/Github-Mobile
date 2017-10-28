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
  new Promise(((resolve, reject) => {
    if (html === undefined) {
      fs.readFile('../store/explore.html', 'utf8', (err, data) => {
        if (err) reject(`cannot read file: ${err.message}`)
        else resolve(source = data)
      })
    } else {
      resolve(source)
    }
  })).then((s) => {
    const $ = cheerio.load(s)
    console.log($('body').length)
  }).catch((e) => {
    console.error(e)
  })
}

module.exports = getExploreData

getExploreData()
