import React from 'react'
import { Tooltip } from 'antd'
import './LanguageBar.scss'
import Reflect from '../../../utils/languages'

export default function LanguageBar({ lang, style }) {
  const bar = []
  let sum = 0
  for (const p in lang) { //eslint-disable-line
    sum += lang[p]
  }
  for (const attr in lang) { //eslint-disable-line
    const len = `${((lang[attr] / sum) * 100).toFixed(2)}%` //eslint-disable-line
    let color
    try {
      color = Reflect[attr].color //eslint-disable-line
    } catch (e) {
      color = '#eee'
    }
    bar.push(<Tooltip key={attr} overlay={`${attr} ${len}`} placement="bottom" style={{ display: 'inline-block' }}><figure style={{ background: color, width: len }} /></Tooltip>)
  }
  return (
    <section style={style} className="lang-bar">{bar}</section>
  )
}
