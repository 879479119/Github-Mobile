import React from 'react'
import Bezier from "paths-js/bezier"
import cls from "classnames"

export default function ({data, className, parent: {width= 600, height= 200}, ...props}) {
	//get the copy of the data, since we may render it again
	let arr = data.data.data[0].weeks.slice(),
		len = arr.length,
		start = arr[0].w
	let points = []
	let week = 60 * 60 * 24 * 7
	//get how long the bar is
	let weeksCount = (arr[len-1].w - arr[0].w) / week
	let span = width / weeksCount
	for(let p = 0;p < weeksCount;p ++){
		let k = height
		if(arr[0].w === start + p * week){
			k = height - arr.shift().c * 10
		}
		points.push([p * span, k])
	}

	// arr.map((t, i) => {
	// 	let date = new Date(t.w * 1000)
	// 	points.push([i*30,t.c*10])
	// })
	let curve = Bezier({
		points: points,
		tension: 0.4
	});
	console.info(data)
	//some preset of path
	let p = curve.path.print()

	return (
		<svg width={width} height={height}>
			<path d={p.replace(/M 0 (\d+)/,`M -10 ${height} L 0 $1`)} stroke="#00caab" fill="#00caab" fillOpacity={0.4}/>
		</svg>
	)
}