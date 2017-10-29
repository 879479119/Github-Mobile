import React from 'react'
import formatDate from '../../../../utils/formatDate'

export default function ({
  data, width, category = 8, selector, exact,
}) {
  const labels = []
  if (Array.isArray(exact)) {
    const t = width / exact.length
    for (let i = 0; i < exact.length; i++) {
      labels.push({ x: (i + 0.5) * t, text: exact[i] })
    }
  } else {
    const day = 60 * 60 * 24
    const week = day * 7
    // get the copy of the data, since we may render it again
    const arr = data.concat()
    const len = arr.length
    const start = arr[0].w
    const end = arr[len - 1].w
    const weeksCount = (arr[len - 1].w - arr[0].w) / week + 1
    const span = width / weeksCount

    // dealing with the axisX, generate the category

    const count = (end - start) / day
    const everyday = width / count
    // period means the gap between labels (day)
    const period = (count / category) >>> 0

    // noinspection FallThroughInSwitchStatementJS
    switch (true) {
      case count > 30 * 12 * 3:
        // label it with year only
        const year = new Date(start * 1000).getFullYear() + 1
        const first = new Date(`1 1,${year}`)
        const last = new Date(end * 1000).getFullYear()
        const offset = (first.getTime() / 1000 - start) / day * everyday
        for (let k = 0; k <= last - year; k++) {
          labels.push({ x: offset + k * everyday * 365, text: year + k })
        }
        // there is no statement like break, we would like to add some label on it
      case count > 30 * 12:
        if (count > 30 * 20 * 3) break
        // add months to the array of years
        // first year
        if (offset - everyday * 183 > 0) labels.push({ x: offset - everyday * 183, text: 'July' })
        for (let k = 0; k <= last - year; k++) {
          if (offset + (k + 0.5) * everyday * 365 > width) break
          labels.push({ x: offset + (k + 0.5) * everyday * 365, text: 'July' })
        }
        break
      case count > 30:
        const block = weeksCount / category
        if (selector) {
          for (let i = 0; i < len; i += selector + 1) {
            const text = formatDate((start + i * week) * 1000, 1)
            labels.push({ x: (i + 0.5) * width / len, text })
          }
        } else {
          for (let i = 1; i < category; i++) {
            const text = formatDate((start + i * period * day) * 1000, 1)
            labels.push({ x: (i + 0.5) * block * span, text })
          }
        }
        break
      default:
        throw Error('Wrong parameters')
    }
  }

  return (
    <g>
      {
        labels.map(item => (
          <line x1={item.x} x2={item.x} y2={3} style={{ stroke: '#aaa' }} />
        ))
      }
      <g transform="translate(10,10)">
        {
          labels.map(item => (
            <text x={item.x - 15} style={{ fill: '#aaa', fontSize: 10, userSelect: 'none' }}>{item.text}</text>
          ))
        }
      </g>
    </g>
  )
}
