import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import {spring, StaggeredMotion} from "react-motion"
import getSeriesColor from '../../utils/colors'
import './Percentage.scss'

function genePath(lang, conf) {

	let { outR,innerR,cx,cy,style } = conf,
		width = (outR - innerR) / 2,
		r = innerR + width

	let color = getSeriesColor(lang.length, style)
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

export default class Percentage extends Component{

	constructor(...props){
		super(...props)
		this.state = {
			over: false
		}
	}

	mouseOver(e){
		let dom = e.target
		console.log(dom.style.transform)
		dom.style.transform += " scale(1.2)"
	}

	mouseLeave(e){
		let dom = e.target
		console.log(dom.style.transform)
		dom.style.transform = dom.style.transform.split(" ")[0]
	}

	render = () => {

		const { width= 290, height= 300, conf, percentage } = this.props
		const defaultConf ={
			padding: 3,
			colors: [],
			style: 'blue',
			cx: 60,
			cy: 60,
			outR: 60,
			innerR: 30
		}

		let path = genePath(percentage, Object.assign(defaultConf, conf))
		let pathLabels = path.map((item,index)=>{
			return (circle) => (
				<path onMouseOver={::this.mouseOver} onMouseLeave={::this.mouseLeave} className="path" d={item.path} key={index} fill="transparent" stroke={item.color} strokeWidth={item.width}  style={{transformOrigin:item.center,transform:`rotate(${circle}deg)`}}/>
			)
		})

		return (
			<div className="percentage" style={{width,height,display:'inline-block',verticalAlign:'top'}}>
				<StaggeredMotion
					defaultStyles={(new Array(path.length)).fill({h:0})}
					styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
						return i === 0
							? {h: spring(path[i].r)}
							: {h: spring(prevInterpolatedStyles[i - 1].h+path[i].r)}
					})}>
					{
						interpolatingStyles =>
							<svg>
							{interpolatingStyles.map((style, i) =>
								pathLabels[i](style.h)
							)}
							</svg>
					}
				</StaggeredMotion>
			</div>
	)}
}