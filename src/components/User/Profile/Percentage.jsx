import React, { Component } from 'react'
import {spring, StaggeredMotion} from "react-motion"
import getSeriesColor from '../../../utils/colors'
import './Percentage.scss'

function genePath(lang, conf) {

	let { outR,innerR,cx,cy,color } = conf,
		width = (outR - innerR) / 2,
		r = innerR + width

	let result = []
	lang.map((item, index)=>{
		if (item <= 100) {
			let progress = item / 100
			let degrees = progress * 360
			let rad = degrees * (Math.PI / 180)
			let x = (Math.sin(rad) * r).toFixed(2)
			let y = -(Math.cos(rad) * r).toFixed(2)
			let length = window.Number(degrees > 180)
			let descriptions = ['M', cx, cy-r, 'A', r, r, 0, length, 1, +x+cx, +y+cy];
			result.push({
				r: index === 0 ? 0 : lang[index - 1] * 3.6,
				path: descriptions.join(' '),
				width: width * 2,
				center: `${cx}px ${cy}px 0`,
				color: color[index]
			})
		}
	})
	return result
}

function geneText(percentage, keys, conf) {
	const { color, text: {
		x, y, size, col, row,
		paddingCol,
		paddingRow
	} } = conf

	return percentage.map((item, index) => {
		let px = x + ((index / row) >>> 0) * paddingCol
		let py = y + (index % row) * paddingRow
		return {
			x: px,
			y: py,
			size,
			color:color[index],
			text: keys[index]
		}
	})
}

export default function (props) {

		const { width= 290, height= 'auto', conf= {}, percentage, children } = props
		const defaultConf ={
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
				paddingRow: 20
			}
		}
		conf.color = getSeriesColor(percentage.length, conf.style || defaultConf.style)

		let path = genePath(percentage, Object.assign(defaultConf, conf))
		let text = geneText(percentage, ['Javascript','Java','C','C++','Ruby','Python'], Object.assign(defaultConf, conf))


		let pathLabels = path.map((item,index)=>{
			return (circle) => {
				return (
			<path className="path"
			      d={item.path}
			      key={'g'+index}
			      fill="transparent"
			      stroke={item.color}
			      strokeWidth={item.width}
			      style={{transformOrigin:item.center,transform:`rotate(${circle}deg)`}}
			/>
			)}
		})

		let textLabels = text.map((item,index)=>{
			return (opacity) => {
				return (
				<g key={'text'+index} className="label" style={{opacity}} color={opacity}>
					<rect x={item.x-15}
					      y={item.y-7}
					      width={10}
					      height={10}
					      fill={item.color}
					/>
					<text x={item.x}
					      y={item.y}
					      fontSize={item.size}
					      color="#000"
					      alignmentBaseline={'middle'}
					>{item.text}</text>
				</g>
			)}
		})

		return (
			<div className="percentage" style={{width,height,display:'inline-block',verticalAlign:'top'}}>
				{children}
				<svg  style={{width,height}}>
					<StaggeredMotion
						defaultStyles={(new Array(path.length)).fill({h:0})}
						styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
							return i === 0
								? {h: spring(path[i].r)}
								: {h: spring(prevInterpolatedStyles[i - 1].h+path[i].r)}
						})}>
						{
							interpolatingStyles =>
								<g>
								{interpolatingStyles.map((style, i) =>
									pathLabels[i](style.h)
								)}
								</g>
						}
					</StaggeredMotion>
					<StaggeredMotion
						defaultStyles={(new Array(text.length)).fill({o:0})}
						styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
							return i === 0
								? {o: spring(1)}
								: {o: spring(prevInterpolatedStyles[i - 1].o)}
						})}>
						{
							interpolatingStyles =>
								<g>
								{interpolatingStyles.map((style, i) =>
									textLabels[i](style.o)
								)}
								</g>
						}
					</StaggeredMotion>
				</svg>
			</div>
	)
}