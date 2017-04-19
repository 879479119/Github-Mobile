import React, { Component } from 'react'
import {spring, StaggeredMotion} from "react-motion"

function genePath(lang) {
	lang = [
		10,10,10,20,25,
	]
	let sum = lang.reduce((prevAll,cur)=>{
		return prevAll.concat(prevAll[prevAll.length-1]+cur)
	},[0])
	let outR = 30,
		innerR = 10

	let centerX = 40,
		centerY = 40

	let result = []
	lang.map((item, index)=>{
		if (item <= 100) {
			let progress = item / 100;
			let degrees = progress * 360;
			let rad = degrees * (Math.PI / 180);
			let x = (Math.sin(rad) * outR).toFixed(2)
			let y = -(Math.cos(rad) * outR).toFixed(2)
			let length = window.Number(degrees > 180)
			let descriptions = ['M', centerX, centerY-outR, 'A', outR, outR, 0, length, 1, +x+centerX, +y+centerY];
			result.push({
				r: sum[index],
				path: descriptions.join(' ')
			})
		}
	})

	return result
}

export default class Percentage extends Component{
	componentWillMount(){
		console.log(genePath());
	}
	render = () => (
		<div className="percentage">
				<svg>
					{
						genePath().map((item,index,arr)=>{
							let r = item.r
							return (
								<path d={item.path} key={index} fill="transparent" stroke="rgba(255,255,0,0.4)" strokeWidth={10}  style={{transformOrigin:`40px 40px`,transform:`rotate(${r*3.6}deg)`}}/>
							)
						})
					}
				</svg>
				<StaggeredMotion
					defaultStyles={[{h: 0}, {h: 0}, {h: 0}]}
					styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
						return i === 0
							? {h: spring(100)}
							: {h: spring(prevInterpolatedStyles[i - 1].h)}
					})}>
					{
						interpolatingStyles =>
							<svg>
							{interpolatingStyles.map((style, i) =>
								<path key={i} d={`M0,${i*20+6} h${style.h} z`} stroke="#000" strokeWidth='6'/>
							)}
							</svg>
					}
				</StaggeredMotion>

		</div>
	)
}