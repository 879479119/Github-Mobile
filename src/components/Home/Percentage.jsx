import React, { Component } from 'react'
import {spring, StaggeredMotion} from "react-motion"

function cal(lang) {
	lang = [
		60,20,10,10
	]
	let outR = 50,
		innerR = 20

	let centerX = 40,
		centerY = 40

	let result = lang.reduce((prevAll, cur) => {

		console.log(prevAll)
		let sum = prevAll[prevAll.length-1].sum

		let r = Math.PI * cur / 100 * 2
		let x = Math.sin(r) * outR + centerX
		let y = Math.cos(r) * outR + centerY

		let pX = outR / Math.cos(cur/100) * Math.sin(sum) + centerX
		let pY = outR / Math.cos(cur/100) * Math.sin(sum) + centerY

		return prevAll.concat({
			sum: sum + r,
			points: [
				prevAll[prevAll.length-1].points[2],
				{x:pX,y:pY},
				{x:x,y:y},
				prevAll[prevAll.length-1].points[5],
				{x:innerR / Math.cos(cur/100) * Math.sin(sum) + centerX,y:innerR / Math.cos(cur/100) * Math.sin(sum) + centerY},
				{x:Math.sin(r) * innerR + centerX,y:Math.cos(r) * innerR + centerY},
			]
		})
	},[{
		sum: 0,
		points: [
			{x:centerX,y:centerY-outR},
			{x:centerX,y:centerY-outR},
			{x:centerX,y:centerY-outR},
			{x:centerX,y:centerY-innerR},
			{x:centerX,y:centerY-innerR},
			{x:centerX,y:centerY-innerR},
		]
	}])

	return result
}

export default class Percentage extends Component{
	componentDidMount(){
		// console.log(cal());
	}
	render = () => (
		<div className="percentage">
				<svg>
					{
						cal().map((item,index,arr)=>{
							let p = item.points
							return(
								<path key={index} d={`M${p[0].x},${p[0].y} Q${p[1].x},${p[1].y} ${p[2].x},${p[2].y}`} stroke="#000"/>
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