/**
 * just in a simple way as we need
 * @param obj
 */

module.exports = function (obj) {
	let values = Object.values(obj)
	return JSON.stringify(values).slice(1,-1)
}
