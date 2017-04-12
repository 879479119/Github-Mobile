/**
 * just in a simple way as we need
 * @param obj
 */

module.exports = function (obj) {
	let values = []
	try{
		values = Object.values(obj)
	}catch (e){
		for(let attr in obj){
			if(obj.hasOwnProperty(attr)){
				let prop = obj[attr]
				//if only it's array or function or object
				if(typeof prop === 'object') {
					prop = JSON.stringify(prop)
				}
				values.push(prop)
			}
		}
	}
	return JSON.stringify(values).slice(1,-1)
}
