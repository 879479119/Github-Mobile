import React, { Component } from 'react'
import { Icon } from 'antd'
import { spring, StaggeredMotion } from 'react-motion'
import getSeriesColor from '../../../utils/colors'
import './Percentage.scss'

function genePath(lang, conf) {
  const {
    outR, innerR, cx, cy, color,
  } = conf
  const width = (outR - innerR) / 2
  const r = innerR + width

  const result = []
  lang.forEach((item, index) => {
    if (item.count <= 100) {
      const progress = item.count / 100
      const degrees = progress * 360
      const rad = degrees * (Math.PI / 180)
      const x = (Math.sin(rad) * r).toFixed(2)
      const y = -(Math.cos(rad) * r).toFixed(2)
      const length = window.Number(degrees > 180)
      const descriptions = ['M', cx, cy - r, 'A', r, r, 0, length, 1, +x + cx, +y + cy]
      result.push({
        r: index === 0 ? 0 : lang[index - 1].count * 3.6,
        path: descriptions.join(' '),
        width: width * 2,
        center: `${cx}px ${cy}px 0`,
        color: color[index],
      })
    }
  })
  return result
}

function geneText(percentage, conf) {
  const {
    color, text: {
      x, y, size, row,
      paddingCol,
      paddingRow,
    },
  } = conf

  return percentage.map((item, index) => {
    const px = x + ((index / row) >>> 0) * paddingCol
    const py = y + (index % row) * paddingRow
    return {
      x: px,
      y: py,
      size,
      color: color[index],
      text: item.name,
    }
  })
}

export default class Percentage extends Component {
  render() {
    return ren(this.props)
  }
}

function ren(props) {
  const {
    width = 290, height = 'auto', conf = {}, percentage, children,
  } = props
  const defaultConf = {
    color: [],
    style: 'blue',
    cx: 60,
    cy: 60,
    outR: 60,
    innerR: 30,
    text: {
      x: 150,
      y: 50,
      size: 12,
      col: 2,
      row: 3,
      paddingCol: 70,
      paddingRow: 20,
    },
  }
  conf.color = getSeriesColor(percentage.length, conf.style || defaultConf.style)

  let sum = 0
  for (let i = 0; i < percentage.length; i++) sum += percentage[i].count
  for (let i = 0; i < percentage.length; i++) percentage[i].count = percentage[i].count / sum * 100
  const path = genePath(percentage, Object.assign(defaultConf, conf))
  const text = geneText(percentage, Object.assign(defaultConf, conf))


  const pathLabels = path.map((item) => {
    return (circle) => {
      return (
        <path
          key={item.color}
          className="path"
          d={item.path}
          fill="transparent"
          stroke={item.color}
          strokeWidth={item.width}
          style={{ transformOrigin: item.center, transform: `rotate(${circle}deg)` }}
        />
      )
    }
  })

  const textLabels = text.map((item) => {
    return (opacity) => {
      return (
        <g className="label" style={{ opacity }} color={opacity} key={item.text}>
          <rect
            x={item.x - 15}
            y={item.y - 7}
            width={10}
            height={10}
            fill={item.color}
          />
          <text
            x={item.x}
            y={item.y}
            fontSize={item.size}
            color="#333"
            alignmentBaseline="middle"
          >{item.text}
          </text>
        </g>
      )
    }
  })

  if (path.length === 0) {
    return (
      <div
        className="percentage" style={{
          width, height, display: 'inline-block', verticalAlign: 'top',
        }}
      >
        <Icon type="loading" />
      </div>
    )
  }

  return (
    <div
      className="percentage" style={{
        width, height, display: 'inline-block', verticalAlign: 'top',
      }}
    >
      {children}
      <svg style={{ width, height }}>
        <StaggeredMotion
          defaultStyles={new Array(path.length).fill({ h: 0 })}
          styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
            return i === 0
              ? { h: spring(path[i].r) }
              : { h: spring(prevInterpolatedStyles[i - 1].h + path[i].r) }
          })}
        >
          {interpolatingStyles => (
            <g>
              {interpolatingStyles.map((style, i) =>
              pathLabels[i](style.h))}
            </g>
          )}
        </StaggeredMotion>
        <StaggeredMotion
          defaultStyles={new Array(text.length).fill({ o: 0 })}
          styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
            return i === 0
              ? { o: spring(1) }
              : { o: spring(prevInterpolatedStyles[i - 1].o) }
          })}
        >
          {interpolatingStyles => (
            <g>
              {interpolatingStyles.map((style, i) =>
                textLabels[i](style.o))}
            </g>
          )}
        </StaggeredMotion>
      </svg>
    </div>
  )
}
