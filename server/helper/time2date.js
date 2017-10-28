function pad(num, n) {
  return new Array(n > num ? (n - (`${num}`).length + 1) : 0).join('0') + num
}

module.exports = function (dateString) {
  const date = new Date(dateString)
  const F = date.getFullYear()
  const Mo = pad(date.getMonth() + 1, 2)
  const D = pad(date.getDate(), 2)
  const H = pad(date.getHours(), 2)
  const Mi = pad(date.getMinutes(), 2)
  const S = pad(date.getSeconds(), 2)
  return `${F}-${Mo}-${D} ${H}:${Mi}:${S}`
}
