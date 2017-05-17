import React, {Component} from 'react'
import Bezier from "paths-js/bezier"
import cls from "classnames"
import formatDate from "../../../utils/formatDate"

export default class BarChart extends Component{

	select(e){
		let left = e.clientX - this.offsetLeft
		//TODO: lots to do
	}
	drag(e){
		if(e.clientX === 0) return
		if(this.left >= this.right) return
		let latest = e.clientX - this.offsetLeft - 10

		if(e.target.classList[0] === 'l'){
			this.left = latest
		}else{
			this.right = latest
		}

		//we must make those operation on the real DOM, ro it will take a long time to re-render
		e.target.setAttribute('x', latest)
		let width = Math.abs(this.right - this.left)
		this.selection.setAttribute('x', this.left+'px')
		this.selection.setAttribute('width', width+'px')
	}
	componentDidMount(){
		this.offsetLeft = document.querySelector('.main-body').offsetLeft
		this.selection = document.querySelector('.selection')
		this.left = 100
		this.right = 200
	}
	render(){
		let {data, className, parent: {width= 1000, height= 100}, ...props} = this.props
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

		//these are all the line types
		let base = [1, 4, 10, 20, 40, 50, 80, 100, 160, 200, 300, 400, 500]
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
		let everyday = width / count
		//period means the gap between labels (day)
		let period = (count / 8) >>> 0
		let labels = []
		console.info(count)
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
					if(offset + k * everyday * 183 > width + 20) break
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
		let per = height / max

		for(let p = 0;p < weeksCount;p ++){
			let k = height
			if(arr[0].w === start + p * week){
				k = height - arr.shift().c * per
			}
			points.push([p * span, k])
		}
		// points.push([weeksCount * span,height])
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
					<path d={p.replace(/M 0 (\d+)/,`M -10 ${height} L 0 $1`)} fill="#28a745" fillOpacity={0.4} style={{transform: 'translateX(10px)'}} />
				</g>
				<g  transform={`translate(10,${height+20})`}>
					{
						labels.map((item, index)=>(
							<text x={item.x-15} key={'t'+index} style={{fill: '#aaa',fontSize: 10,userSelect: 'none'}}>{item.text}</text>
						))
					}
				</g>
				<g transform={`translate(10,10)`}>
					<rect className="selection" x={100} width={100} height={100} onDrag={::this.select} draggable="true" />
					<rect className="l" x={95} width={10} height={100} onDrag={::this.drag} draggable="true"/>
					<rect className="r" x={195} width={10} height={100}  onDrag={::this.drag} draggable="true" />
				</g>
			</svg>
		)
	}
}