import reflect from './emojiReflect'

export default function (str, html = true) {
  if (!str) return ''
  const arr = str.split(':')
  let prevCover = false
  const r = arr.map((item, index) => {
    if (item in reflect) {
      if (prevCover === true) {
        prevCover = false
        return `:${item}`
      }
      prevCover = true
      if (html === true) return `<span class="emoji">${reflect[item]}</span>`
      else return reflect[item]
    } else {
      if (prevCover === true) prevCover = false
      return item
    }
  })
  return r.join('')
}
