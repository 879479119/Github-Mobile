/**
 * @author rocksama
 * @created 2017/6/17
 * @description
 */
export function setItem(key, value) {
  /**
	 * type check needed, so you cannot call this function so frequently
	 */
  typeCheck(value)
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getItem(key) {
  let result
  try {
    result = JSON.parse(window.localStorage.getItem(key))
  } catch (e) {
    result = window.localStorage.getItem(key)
  }
  return result
}


export function removeItem(key) {
  window.localStorage.removeItem(key)
  return 0
}


function typeCheck(obj) {
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    /**
		 * TODO: if it's a nested object and the object in it refers to its parent, the function will crush
		 */
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (Number.isNaN(p) || !Number.isFinite(p)) {
          throw Error('You cannot store value that is NaN or Infinity')
        }
        typeCheck(p)
      }
    }
  }
}
