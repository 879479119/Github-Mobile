/**
 * @author zi
 * @created 2017/5/7
 * @description
 */
export default function (num, from = 1, to = undefined) {
  const bit = parseFloat(num) * from >>> 0
  if (bit < 0) throw Error('you must give a positive number')
  if (to === 1e3) return `${(bit / to).toFixed(2)}KB`
  if (to === 1e6) return `${(bit / to).toFixed(2)}MB`
  else {
    if (bit > 1e6) return `${(bit / 1e6).toFixed(2)}MB`
    if (bit > 1e3) return `${(bit / 1e3).toFixed(2)}KB`
    return `${bit}B`
  }
}
