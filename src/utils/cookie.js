/**
 *
 * @param [name]
 * @return {String, Number}
 */

export function getCookie(name) {
  if (name === void 0) return document.cookie

  const reg = new RegExp(`${name}=(.*)(;|$)`)
  const result = document.cookie.match(reg)

  if (result === null) return -1
  else return result[1]
}
