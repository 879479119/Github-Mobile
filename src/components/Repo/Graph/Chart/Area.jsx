import React from "react";
import Bezier from "paths-js/bezier";

export default function (props) {
	let { data, parent: {width, height}, fill, max: maxTop } = props

	//get the copy of the data, since we may render it again
	let arr = data.concat(),
		len = arr.length,
		start = arr[0].w
	let points = []
	let week = 60 * 60 * 24 * 7
	let weeksCount = (arr[len-1].w - arr[0].w) / week + 1
	let span = width / +weeksCount

	let max = 0
	if(maxTop){
		max = maxTop
	}else{
		for(let i = 0;i < len;i ++){
			if(arr[i].c > max) max = arr[i].c
		}
	}

	//get how long the bar is
	let per = height / max

	for(let p = 0;p < weeksCount;p ++){
		let k = height
		if(arr[0].w === start + p * week){
			k = height - arr.shift().c * per
		}
		points.push([p * span, k])
	}
	points.push([weeksCount * span, height])

	// points.push([weeksCount * span,height])
	let curve = Bezier({
		points: points,
		tension: 0.4
	})

	//some preset of path
	//noinspection JSUnresolvedVariable
	let p = curve.path.print()
	return (
		<g transform={`translate(10,10)`}>
			<path d={p.replace(/M 0 (\d+)/,`M -10 ${height} L 0 $1`)} fill={fill || "#28a745"} fillOpacity={0.4} style={{transform: 'translateX(10px)'}} />
		</g>
	)
}