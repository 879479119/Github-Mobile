import React from "react";

export default function (props) {
	const {data, width, height, max: maxTop } = props

	let arr = data.concat(),
		len = arr.length

	return (
		<g>
			<g transform={`translate(0,${height-line*per+10})`} className="left">
				<text>{line}</text>
				<line x2={width} stroke="#ccc" strokeOpacity={0.5}  shapeRendering="crispEdges" />
			</g>
			<g transform={`translate(0,${height-line/2*per+10})`}  className="left">
				<text>{line/2}</text>
				<line x2={width} stroke="#ccc" strokeOpacity={0.5} shapeRendering="crispEdges" />
			</g>
		</g>
	)
}