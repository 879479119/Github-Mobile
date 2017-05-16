import React from 'react'
import Bezier from "paths-js/bezier"
import cls from "classnames"
import formatDate from "../../../utils/formatDate"

export default function ({data, className, parent: {width= 1000, height= 100}, ...props}) {
	//get the copy of the data, since we may render it again
	let arr = data.data.data[0].weeks.slice(),
		len = arr.length,
		start = arr[0].w,
		end = arr[len-1].w
	let points = []
	let week = 60 * 60 * 24 * 7
	let weeksCount = (arr[len-1].w - arr[0].w) / week + 1
	let span = width / weeksCount

	//get the max value of the commits
	let max = 0
	for(let i = 0;i < len;i ++){
		if(arr[i].c > max) max = arr[i].c
	}
	let base = [1, 4, 10, 20, 50, 100, 200, 500]
	let line = 500
	for(let t = base.length - 1;t > 0;t --){
		if(max >= base[t]){
			line = base[t]
			break
		}
	}

	//dealing with the axisX, generate the category
	let day = 60 * 60 * 24
	let count = (end - start) / day
	console.info(count)
	//period means the gap between labels (day)
	let period = (count / 8) >>> 0
	let labels = []
	switch (true){
		case count > 30 * 12:
			//label it with year
			break
		case count > 30 * 3:
			break
		case count > 30:
			for(let i = 1;i < 8;i ++){
				let text = formatDate((start + i * period * day) * 1000, 1)
				labels.push({x: (i) * span, text})
			}
			break
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
	// points.push([weeksCount * span,height])
	console.info(points)
	let curve = Bezier({
		points: points,
		tension: 0.4
	})

	//some preset of path
	let p = curve.path.print()

	return (
		<svg width={width+20} height={height+40} {...props} className="chart-bar">
			<g transform={`translate(0,${height-line*per+10})`} className="left">
				<text>{line}</text>
				<line x2={width} stroke="#ccc" strokeOpacity={0.5} />
			</g>
			<g transform={`translate(0,${height-line/2*per+10})`}  className="left">
				<text>{line/2}</text>
				<line x2={width} stroke="#ccc" strokeOpacity={0.5} />
			</g>
			<g transform={`translate(0,${height+10})`}  className="left">
				<text>0</text>
				<line x2={width} stroke="#ccc" strokeOpacity={0.5} />
				<g>
					{
						labels.map((item, index)=>(
							<line x1={item.x} x2={item.x} y2={3} key={'l'+index} style={{stroke: '#aaa'}}/>
						))
					}
				</g>
			</g>
			<g transform={`translate(10,10)`}>
				<path d={p.replace(/M 0 (\d+)/,`M -10 ${height} L 0 $1`)} stroke="#00caab" fill="#00caab" fillOpacity={0.4} style={{transform: 'translateX(10px)'}} />
			</g>
			<g  transform={`translate(10,${height+20})`}>
				{
					labels.map((item, index)=>(
						<text x={item.x-15} key={'t'+index} style={{fill: '#aaa',fontSize: 10}}>{item.text}</text>
					))
				}
			</g>
		</svg>
	)
}