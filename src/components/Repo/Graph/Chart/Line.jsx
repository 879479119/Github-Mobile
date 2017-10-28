import React from 'react'

export default function (props) {
  const {
    data, width, height, fill,
  } = props
  const arr = data.concat()
  const len = arr.length
  let per = 1
  if (Math.max(...arr) !== 0) {
    per = height / Math.max(...arr)
  }

  const w = width / len
  const points = []
  let path = `M 0 ${height - arr[0] * per} `
  // find the key points
  arr.forEach((t, i) => {
    const x = i * w
    const h = height - per * t
    points.push({ x, h })
    if (i > 0) path += `L ${x} ${h} `
  })

  return (
    <g transform={`translate(${w / 2 + 10},10)`} fill="transparent" className="linear">
      <path d={path} stroke={fill || '#28a745'} strokeWidth={2} />
      {
        points.map((item) => {
          return <circle r={4} cx={item.x} cy={item.h} />
        })
      }
    </g>
  )
}
