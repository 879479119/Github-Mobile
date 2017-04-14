let DataQuery = require('../dao/userAccess')

module.exports = function (gname, gid) {
	return DataQuery.getLangInfo(gname, gid).then(arr=>{
		let countObj = {}
		arr.map(item=>{
			let detail = item.languages
			if(detail === undefined) return 0
			let p = JSON.parse(detail)
			try{
				Object.keys(p).map(lang=>{
					if(!(lang in countObj)) countObj[lang] = 0
					countObj[lang] += p[lang]
				})
			}catch (err){
				log(err, 1)
				for(let lang in p){
					if(p.hasOwnProperty(lang)){
						if(!(lang in countObj)) countObj[lang] = 0
						countObj[lang] += p[lang]
					}
				}
			}
		})
		return countObj
	})
}
