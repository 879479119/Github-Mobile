import React, {Component} from 'react'
import Bezier from "paths-js/bezier"
import cls from "classnames"
import formatDate from "../../../utils/formatDate"

export default class BarChart extends Component{
	render(){
		let {data, className, parent: {width, height}, level, fill, max: maxTop, ...props} = this.props
		let simpleMode = false
		if(level === "simple") simpleMode = true
		let innerWidth = width - 20,
			innerHeight = height - 30
		//get the copy of the data, since we may render it again
		let arr = data.concat(),
			len = arr.length,
			start = arr[0].w,
			end = arr[len-1].w
		let points = []
		let week = 60 * 60 * 24 * 7
		let weeksCount = (arr[len-1].w - arr[0].w) / week + 1
		let span = innerWidth / weeksCount

		//get the max value of the commits
		let max = 0

		//these are all the line types
		let base = [1, 4, 10, 20, 40, 50, 80, 100, 160, 200, 300, 400, 500]
		let line = 500
		console.info(maxTop)
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

		//dealing with the axisX, generate the category
		let day = 60 * 60 * 24
		let count = (end - start) / day
		let everyday = innerWidth / count
		//period means the gap between labels (day)
		let period = (count / 8) >>> 0
		let labels = []
		//noinspection FallThroughInSwitchStatementJS
		switch (true){
			case count > 30 * 12 * 3:
				//label it with year only
				let year = new Date(start * 1000).getFullYear() + 1
				let first = new Date('1 1,'+year),
					last = new Date(end * 1000).getFullYear(),
					offset = (first.getTime() / 1000 - start) / day * everyday
				for(let k = 0;k <= last - year;k ++){
					labels.push({x: offset + k * everyday * 365, text: year + k})
				}
			//there is no statement like break, we would like to add some label on it
			case count > 30 * 12:
				if(count > 30 * 20 * 3) break
				//add months to the array of years
				//first year
				if(offset - everyday * 183 > 0) labels.push({x: offset - everyday * 183, text: 'July'})
				for(let k = 0;k <= last - year;k ++){
					if(offset + k * everyday * 183 > innerWidth) break
					labels.push({x: offset + k * everyday * 183, text: 'July'})
				}
				break
			case count > 30:
				let block = weeksCount / 8
				for(let i = 1;i < 8;i ++){
					let text = formatDate((start + i * period * day) * 1000, 1)
					labels.push({x: (i) * block * span, text})
				}
				break
		}

		//get how long the bar is
		let per = innerHeight / max

		for(let p = 0;p < weeksCount;p ++){
			let k = innerHeight
			if(arr[0].w === start + p * week){
				k = innerHeight - arr.shift().c * per
			}
			points.push([p * span, k])
		}
		points.push([weeksCount * span, innerHeight])
		// points.push([weeksCount * span,innerHeight])
		let curve = Bezier({
			points: points,
			tension: 0.4
		})

		//some preset of path
		//noinspection JSUnresolvedVariable
		let p = curve.path.print()

		return (
			<svg width={width} height={height} {...props} className={cls("chart-bar", className)}>
				<g transform={`translate(0,${innerHeight-line*per+10})`} className="left">
					<text>{line}</text>
					<line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} />
				</g>
				{
					simpleMode ? '' :
						<g transform={`translate(0,${innerHeight-line/2*per+10})`}  className="left">
							<text>{line/2}</text>
							<line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} />
						</g>
				}
				<g transform={`translate(10,10)`}>
					<path d={p.replace(/M 0 (\d+)/,`M -10 ${innerHeight} L 0 $1`)} fill={fill || "#28a745"} fillOpacity={0.4} style={{transform: 'translateX(10px)'}} />
				</g>
				<g transform={`translate(0,${innerHeight+10})`}  className="left">
					<rect x={10} y={0} width={innerWidth} height={20} fill="#fafafa"/>
					<text>0</text>
					<line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} />
					<g>
						{
							simpleMode ? '' : labels.map((item, index)=>(
								<line x1={item.x} x2={item.x} y2={3} key={'l'+index} style={{stroke: '#aaa'}}/>
							))
						}
					</g>
				</g>

				{
					simpleMode ? '' :
					<g  transform={`translate(10,${height-10})`}>
						{
							labels.map((item, index)=>(
								<text x={item.x-15} key={'t'+index} style={{fill: '#aaa',fontSize: 10,userSelect: 'none'}}>{item.text}</text>
							))
						}
					</g>
				}

			</svg>
		)
	}
}