const Promise = require('bluebird')
const https = require('https')
const iconv = require('iconv-lite')
const fs = require('fs')
/**
 * @description call this function every one hour is enough,
 * because it takes much time to load the images
 * @return {Object} what the explore page shows
 */
function getPageInHtml(relativeUrl = '/') {
  const option = {
    hostname: 'github.com',
    path: relativeUrl,
  }

  return new Promise(((resolve, reject) => {
    let html = ''
    const req = https.request(option, (res) => {
      res.on('data', (chunk) => {
        html += iconv.decode(chunk, 'gbk')
        console.log(Date.now())
      }).on('end', () => {
        resolve(html)
      })
    }).on('error', (e) => {
      reject(e.message)
    })
    req.end()
  })).then((html) => {
    const file = relativeUrl.match(/^((\/[\w-]+)+)/)
    if (file === null) throw Error("url should looks like '/a/b', but even '/a/a/a-c/s/?p=1#2222' works")
    const param = relativeUrl.split('?')[1]
    const write = fs.createWriteStream(`../store${file[2] + (param || '')}.html`)
    write.write(html)
    console.log('Over')
    write.close()
    return true
  }).catch((errMsg) => {
    console.log(errMsg, 1)
    return false
  })
}

module.exports = getPageInHtml

getPageInHtml('/explore').then((e) => {
  console.log(e)
})
