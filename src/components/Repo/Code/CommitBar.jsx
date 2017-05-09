import React from "react";
import "./CodeTree.scss";

export default function CommitBar(props) {
	const { style, data } = props
	const levels = ['#C6E48B','#7BC96F','#239A3B','#196127']
	/**
	 * @deprecated the time calculation is deprecated
	 * @type {number}
	 * TODO: remember to optimize it
	 */
	let start = 52 - (Date.now() - new Date('2017-04-01T03:18:52Z')) / (1000*60*60*24*7) - 1
	let max = data.all.reduce((p,c)=>c>p?c:p,-1)
	return(
		<div className="commit-bar" style={style}>
			<svg style={{width: 520, height: 100}}>
				<line x1={10} x2={400} y1={20} y2={20} stroke="#888" strokeWidth={1} />
				{
					data.all.map((item, i)=>{
						return <rect key={i} x={20+i*7} y={21} width={7} height={item/max*70 || 0} fill={levels[(item/max*2)>>>0]} opacity={0.8} />
					})
				}
				<rect key={798} x={0} y={0} width={start*7} height={100} fill="rgba(0,0,0,0.06)" />
				{showText(start)}
			</svg>
		</div>
	)
}

function showText(start) {
	if(start <= 0) return
	let text = ''
	if(start > 20) text = "HERE SHOWS HISTORY FOR 1 YEAR"
	else if(start > 10) text = "NOT CREATED"
	return <text y={50} x={20} >{text}</text>
}