/**
 *
 * @param [name]
 * @return {String, Number}
 */

export function getCookie(name) {
	if(name === void 0) return document.cookie

	let reg = new RegExp(`${name}=(.*)(;|$)`)
	let result = document.cookie.match(reg)

	if(result === null) return -1
	else return result[1]
}