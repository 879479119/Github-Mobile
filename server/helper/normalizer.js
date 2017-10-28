/**
 * normalize a nested array into a plain array
 * @param {Array} arr
 * @param {Array} result
 */
module.exports = function flat(arr, result) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) === false) {
      result.push(arr[i])
    } else {
      flat(arr[i], result)
    }
  }
}
