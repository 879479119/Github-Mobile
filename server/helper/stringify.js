/**
 * just in a simple way as we need
 * @param obj
 */

module.exports = (obj) => {
  let values = []
  try {
    values = Object.values(obj)
  } catch (e) {
    for (const attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) {
        let prop = obj[attr]
        // if only it's array or function or object
        if (typeof prop === 'object') {
          prop = JSON.stringify(prop)
        }
        values.push(prop)
      }
    }
  }
  return JSON.stringify(values).slice(1, -1)
}
