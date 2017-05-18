import React, {Component} from "react";
import cls from "classnames";

import Area from "./Area";
import AxisX from "./AxisX";
import AxisY from "./AxisY";

export default class AreaChart extends Component{
	render(){
		let {data, className, parent: {width, height}, level, fill, max: maxTop, ...props} = this.props
		let simpleMode = false
		if(level === "simple") simpleMode = true
		let innerWidth = width - 20,
			innerHeight = height - 30
		//get the copy of the data, since we may render it again
		let arr = data.concat()

		return (
			<svg width={width} height={height} {...props} className={cls("chart-bar", className)}>
				<AxisY data={arr} width={innerWidth} height={innerHeight} />
				<Area data={arr} parent={{width:innerWidth, height:innerHeight}} fill={fill} />
				<g transform={`translate(0,${innerHeight+10})`}  className="left">
					<rect x={10} y={0} width={innerWidth} height={20} fill="#fafafa"/>
					<text>0</text>
					<line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} />
					{ simpleMode ? '' : <AxisX data={arr}  width={innerWidth} height={innerHeight}  /> }
				</g>
			</svg>
		)
	}
}