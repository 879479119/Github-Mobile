import React, { Component } from 'react'
import cls from 'classnames'

import Area from './Area'
import AxisX from './AxisX'
import AxisY from './AxisY'

export default class AreaChart extends Component {
  _twoSides() {
    const {
      data, className, parent: { width, height }, level, fill, smooth, ...props
    } = this.props

    const innerWidth = width - 20
    const innerHeight = height - 30

    const arr = data.concat()
    const len = arr.length
    let maxPositive = 0
    let maxNegative = 0
    for (let i = 0; i < len; i++) {
      if (arr[i].a > maxPositive) maxPositive = arr[i].a
      if (arr[i].d < maxNegative) maxNegative = arr[i].d

      // reverse the negative value
      arr[i].d *= -1
    }

    // reverse the value
    maxNegative *= -1

    const pos = innerHeight / (maxNegative + maxPositive) * maxPositive
    const neg = innerHeight / (maxNegative + maxPositive) * maxNegative

    return (
      <svg width={width} height={height} {...props} className={cls('chart-area-two', className)}>
        <AxisY
          data={arr}
          width={innerWidth}
          height={pos}
          auto
          max={maxPositive}
        />
        <AxisY
          data={arr}
          width={innerWidth}
          height={neg}
          auto
          max={maxNegative}
          transform={`translate(0, ${pos + 20})`}
          reverse
        />
        <Area
          data={arr}
          attr="a"
          parent={{ width: innerWidth, height: pos }}
          smooth={false}
          fill="#2cbe4e"
        />
        <Area
          data={arr}
          attr="d"
          parent={{ width: innerWidth, height: neg }}
          smooth={false}
          reverse
          transform={`translate(10,${pos + 10})`}
          fill="#cb2431"
        />
        <g transform={`translate(0,${innerHeight / (maxNegative + maxPositive) * maxPositive + 10})`} className="left">
          <text>0</text>
          <line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} />
          <AxisX data={arr} width={innerWidth} height={innerHeight} />
        </g>
      </svg>
    )
  }
  render() {
    const {
      data,
      className,
      parent: { width, height },
      level,
      fill,
      smooth,
      max: maxTop, ...props
    } = this.props

    if (smooth === false) {
      return this._twoSides()
    }

    let simpleMode = false
    if (level === 'simple') simpleMode = true
    const innerWidth = width - 20
    const innerHeight = height - 30
    // get the copy of the data, since we may render it again
    const arr = data.concat()

    return (
      <svg width={width} height={height} {...props} className={cls('chart-area', className)}>
        <AxisY data={arr} width={innerWidth} height={innerHeight} />
        <Area data={arr} parent={{ width: innerWidth, height: innerHeight }} fill={fill} />
        <g transform={`translate(0,${innerHeight + 10})`} className="left">
          <rect x={10} y={0} width={innerWidth} height={20} fill="#fafafa" />
          <text>0</text>
          <line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} />
          { simpleMode ? '' : <AxisX data={arr} width={innerWidth} height={innerHeight} /> }
        </g>
      </svg>
    )
  }
}
