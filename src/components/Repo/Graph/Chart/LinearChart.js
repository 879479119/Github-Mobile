import React, { Component } from 'react'
import cls from 'classnames'
import { weekday } from '../../../../utils/formatDate'

import AxisX from './AxisX'
import AxisY from './AxisY'
import Line from './Line'

export default class LinearChart extends Component {
  render() {
    const {
      data, className, parent: { width, height }, fill, ...props
    } = this.props

    const innerWidth = width - 20
    const innerHeight = height - 40
    // get the copy of the data, since we may render it again
    const arr = data.concat()

    return (
      <svg width={width} height={height} {...props} className={cls('chart-linear', className)}>
        <AxisY data={arr} width={innerWidth} height={innerHeight} auto />
        <g transform={`translate(0,${innerHeight + 10})`} className="left">
          <rect x={10} y={0} width={innerWidth} height={20} fill="#fafafa" />
          <text>0</text>
          <line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} shapeRendering="crispEdges" />
          <AxisX
            width={innerWidth} height={innerHeight}
            exact={weekday}
          />
        </g>
        <Line data={arr} width={innerWidth} height={innerHeight} />
      </svg>
    )
  }
}
