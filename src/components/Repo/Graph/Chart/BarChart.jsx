import React, {Component} from 'react'
import cls from "classnames"

import AxisX from "./AxisX";
import AxisY from "./AxisY";
import Bar from "./Bar"

export default class BarChart extends Component{
	static childContextTypes = {
		width: React.PropTypes.number,
		height: React.PropTypes.number
	}
	getChildContext(){
		let { parent: {width, height} } = this.props
		return {
			width: width - 20,
			height: height - 40
		}
	}
	render(){
		let {data, className, parent: {width, height}, fill, ...props} = this.props

		let innerWidth = width - 20,
			innerHeight = height - 40
		//get the copy of the data, since we may render it again
		let arr = data.concat()

		//TODO: I'm confused about whether it's better to use 'context'
		return (
			<svg width={width} height={height} {...props} className={cls("chart-bar", className)}>
				<AxisY data={arr} width={innerWidth} height={innerHeight} />
				<g transform={`translate(0,${innerHeight+10})`} className="left">
					<rect x={10} y={0} width={innerWidth} height={20} fill="#fafafa"/>
					<text>0</text>
					<line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5}  shapeRendering="crispEdges" />
					<AxisX data={arr}  width={innerWidth} height={innerHeight} selector={2} />
				</g>
				<Bar data={arr} width={innerWidth} height={innerHeight} fill={fill} />
			</svg>
		)
	}
}