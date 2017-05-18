import React from "react";

export default function AxisY(props) {
	const {data, width, height, max: maxTop } = props

	let arr = data.concat(),
		len = arr.length

	//get the max value of the commits
	let max = 0

	//these are all the line types
	let base = [1, 4, 8, 10, 16, 20, 40, 50, 80, 100, 160, 200, 300, 400, 500]
	let line = 500

	if(maxTop){
		line = maxTop
		max = maxTop
	}else{
		for(let i = 0;i < len;i ++){
			if(arr[i].c > max) max = arr[i].c
		}
		for(let t = base.length - 1;t > 0;t --){
			if(max >= base[t]){
				line = base[t]
				break
			}
		}
	}

	let per = height / max

	//if we need to show the lines as many as we would like to
	if('auto' in props){
		let tags = []
		const gap = [1,2,4,5,8,10,15,20,30,50,100]
		gap.some((k,l)=>{
			if(max / k >= 4 && max / k <= 6){
				// tags.push()
				let p = (max / k) >>> 0
				while(p --){
					tags.push(p * k)
				}
			}
		})
		return (
			<g>{
				tags.map((line, i)=>{
					return (
						<g key={i} transform={`translate(0,${height-line*per+10})`} className="left">
							<text>{line}</text>
							<line x2={width} stroke="#ccc" strokeOpacity={0.5}  shapeRendering="crispEdges" />
						</g>
					)
				})
			}</g>
		)
	}else{
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


}