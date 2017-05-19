import React from "react";
import { Tooltip } from 'antd';
import cls from "classnames"

export default function (props) {
	const {data, width, height, fill, gap=4, callback, active } = props
	//use the callback function to handle click
	function handleClick(e) {
		callback(+e.target.getAttribute('data-index'))
	}
	let arr = data.concat(),
		len = arr.length
	let max = 0

	for(let i = 0;i < len;i ++){
		if(arr[i].c > max) max = arr[i].c
	}

	let per = height / max,
		w = width / len

	return (
		<g transform="translate(0,10)"  fillOpacity={0.8} onClick={handleClick}>
			{arr.map((item, index)=>{
				return (
				<Tooltip key={'r'+index} overlay={item.c + 'commits'} placement="top">
					<rect
						data-index={index}
						width={w-gap/2}
						height={per * item.c}
						x={(index+0.5)*w+gap/2}
						y={height - per * item.c}
						fill={active === index ? "#b31d28" : "#fb8532"}
					/>
				</Tooltip>
				)
			})}
		</g>
	)
}
