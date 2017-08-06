import React from "react";

export default function (props) {
	const { data, width, height, fill } = props

	console.info(data)

	let arr = data.concat(),
		len = arr.length
	let per = 1
	if(Math.max.apply(Math,arr) !== 0){
		per = height / Math.max.apply(Math,arr)
	}

	let w = width / len,
		points = []
	let path = `M 0 ${height - arr[0] * per} `
	//find the key points
	arr.map((t,i)=>{
		let x = i * w,
			h = height - per * t
		points.push({x ,h})
		if(i > 0) path += `L ${x} ${h} `
	})

	return (
		<g transform={`translate(${w/2+10},10)`} fill="transparent" className="linear">
			<path d={path} stroke={fill || "#28a745"} strokeWidth={2} />
			{
				points.map((item, i)=>{
					return <circle key={i} r={4} cx={item.x} cy={item.h}/>
				})
			}
		</g>
	)
}