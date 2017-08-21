/**
 * get the first letter of string upcased, but not every word of it
 * @param {String} str
 * @returns {String}
 */
export function upcaseFirstLetter(str) {
  if (str.length < 1) return ''
  return str[0].toUpperCase() + str.slice(1)
}

/**
 * judge if the moments are on the same day
 * @param {Array} momentArr
 */
export function isTheSameDay(...momentArr) {
  try {
    momentArr.reduce((prev, cur) => {
      if (prev.format('MMM Do YY') === cur.format('MMM Do YY')) return cur
      throw Error('different day')
    })
    return true
  } catch (e) {
    return false
  }
}
