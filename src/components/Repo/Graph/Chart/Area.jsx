import React from "react";
//TODO: read the core code and get rid of the lib
import Bezier from "paths-js/bezier";

export default function ({data, parent: {width, height}, fill, max: maxTop, attr='c', reverse=false, smooth=true, ...props }) {

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
			if(arr[i][attr] > max) max = arr[i][attr]
		}
	}

	//get how long the bar is
	let per = height / max
	let temp = arr.concat()
	for(let p = 0;p < weeksCount;p ++){
		let k = height
		if(temp[0].w === start + p * week){
			k = height - temp.shift().c * per
		}
		points.push([p * span, k])
	}
	points.push([weeksCount * span, height])

	let p = ""

	if(smooth === true){
		//draw the path smoothly
		let curve = Bezier({
			points: points,
			tension: 0.4
		})
		//some preset of path
		//noinspection JSUnresolvedVariable
		p = curve.path.print()
	}else{
		let w = width / len,
			k = height - arr[0][attr] * per
		let path = `M 0 ${reverse ? 0 : height} L 0 ${reverse ? height - k : k} `
		//find the key points
		arr.map((t,i)=>{
			let h = per * t[attr]
			if(i > 0) path += `L ${i * w} ${reverse ? h : height-h} `
		})
		path += `L ${len * w} ${reverse ? 0 : height} `
		p = path
	}

	return (
		<g transform={`translate(10,10)`} {...props}>
			<path d={p} fill={fill || "#28a745"} fillOpacity={0.4} style={{transform: 'translateX(10px)'}} />
		</g>
	)
}