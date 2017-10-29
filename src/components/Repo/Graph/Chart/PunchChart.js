import React, { Component } from 'react'
import { Tooltip } from 'antd'
import cls from 'classnames'
import { weekday } from '../../../../utils/formatDate'

export default class PunchChart extends Component {
  render() {
    const {
      data, className, margin = [160, 20], parent: { width, height }, ...props
    } = this.props

    const innerWidth = width - 20
    const innerHeight = height - 40
    // get the copy of the data, since we may render it again
    const arr = data.concat()
    const weeks = []

    let max = 0
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][2] > max) max = arr[i][2] //eslint-disable-line
    }

    // serialize the array
    for (let i = 0; i < 7; i++) weeks.push(arr.splice(0, 24))

    const timeline = []
    for (let i = 0; i < 24; i++) {
      timeline.push(`${i % 12 || 12}${i < 12 ? 'a' : 'p'}`)
    }
    return (
      <svg width={width} height={height} {...props} className={cls('chart-punch', className)}>
        {
          weeks.map((row, index) => {
            return (<Row
              margin={margin}
              index={index}
              row={row}
              label={weekday[index]}
              width={innerWidth}
              max={max}
            />)
          })
        }
        <g transform="translate(0,490)">
          {
            timeline.map((item, i) => (
              <text x={margin[0] + i * (width - margin[0] - margin[1] - 20) / 24 - 10} y={24}>
                {item}
              </text>
            ))
          }
        </g>
      </svg>
    )
  }
}

function Row({
  row, label, width, index, margin, max,
}) {
  const lineHeight = 70
  return (
    <g transform={`translate(0,${index * lineHeight})`}>
      <line x2={width} transform={`translate(0,${lineHeight})`} shapeRendering="crispEdges" stroke="#ddd" />
      <text x={10} y={lineHeight / 2} fill="#888" fontSize={16} >{label}</text>
      {
				row.map((t, i) => {
					const posX = margin[0] + i * (width - margin[0] - margin[1]) / 24
					const r = 16 / max * t[2]
					return (
  <g key={i}>
    <line
      x1={posX} x2={posX}
      y1={lineHeight - 8 - (i % 2 === 0 ? 3 : 0)}
      y2={lineHeight} stroke="#ddd"
      shapeRendering="crispEdges"
    />
    <Tooltip overlay={`${t[2]} commits`} placement="top">
      <circle cx={posX} cy={lineHeight / 2} r={r} fill="#2f363d" />
    </Tooltip>
  </g>
					)
				})
			}
    </g>
  )
}
