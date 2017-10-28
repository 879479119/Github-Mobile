const DataQuery = require('../dao/userAccess')

module.exports = function (gname, gid) {
  return DataQuery.getLangInfo(gname, gid).then((arr) => {
    const countObj = {}
    arr.forEach((item) => {
      const detail = item.languages
      if (detail === undefined) return 0
      const p = JSON.parse(detail)
      try {
        Object.keys(p).forEach((lang) => {
          if (!(lang in countObj)) countObj[lang] = 0
          countObj[lang] += p[lang]
        })
      } catch (err) {
        log(err, 1)
        for (const lang in p) {
          if (Object.prototype.hasOwnProperty.call(p, lang)) {
            if (!(lang in countObj)) countObj[lang] = 0
            countObj[lang] += p[lang]
          }
        }
      }
    })
    return { gname, countObj }
  }).then(({ name, countObj }) => {
    return DataQuery.storeLangInfo(name, countObj)
  })
}
