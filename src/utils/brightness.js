/**
 * @author zi
 * @created 2017/5/11
 * @description return the brightness of the color, you can use this when the background doesn't match the color of font
 */
export default function (color) {
  if (color.match(/^rgb(a)*\(/)) {
    throw Error('not support rgb or rgba now')
  } else {
    let result = []
    if (result = color.match(/[0-9a-fA-F]{2}/g)) {
      if (result.length !== 3) throw Error('wrong format')
      const p = e => parseInt(result[e], 16)
      return (0.3 * p(0) + 0.6 * p(1) + 0.1 * p(2)) / 255
    }
  }
}
