import React, {Component} from "react";
import cls from "classnames";

import Area from "./Area";
import AxisX from "./AxisX";
import AxisY from "./AxisY";

export default class AreaChart extends Component{
	_twoSides(){
		let {data, className, parent: {width, height}, level, fill, smooth, ...props} = this.props

		let innerWidth = width - 20,
			innerHeight = height - 30

		let arr = data.concat(), len = arr.length,
			max_positive = 0, max_negative = 0
		for(let i = 0;i < len;i ++){
			if(arr[i].a > max_positive) max_positive = arr[i].a
			if(arr[i].d < max_negative) max_negative = arr[i].d

			//reverse the negative value
			arr[i].d *= -1
		}

		//reverse the value
		max_negative *= -1

		let pos = innerHeight / (max_negative + max_positive) * max_positive
		let neg = innerHeight / (max_negative + max_positive) * max_negative

		return (
			<svg width={width} height={height} {...props} className={cls("chart-area-two", className)}>
				<AxisY data={arr}
				       width={innerWidth}
				       height={pos}
				       auto={true}
				       max={max_positive} />
				<AxisY data={arr}
				       width={innerWidth}
				       height={neg}
				       auto={true}
				       max={max_negative}
				       transform={`translate(0, ${pos + 20})`}
				       reverse={true} />
				<Area data={arr}
				      attr="a"
				      parent={{width:innerWidth, height:pos}}
				      smooth={false}
				      fill={"#2cbe4e"} />
				<Area data={arr}
				      attr="d"
				      parent={{width:innerWidth, height:neg}}
				      smooth={false}
				      reverse={true}
				      transform={`translate(10,${pos + 10})`}
				      fill={"#cb2431"}/>
				<g transform={`translate(0,${innerHeight / (max_negative + max_positive) * max_positive +10})`} className="left">
					<text>0</text>
					<line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} />
					<AxisX data={arr}  width={innerWidth} height={innerHeight} />
				</g>
			</svg>
		)
	}
	render(){
		let {
			data,
			className,
			parent: {width, height},
			level,
			fill,
			smooth,
			max: maxTop, ...props} = this.props

		if(smooth === false){
			return this._twoSides()
		}

		let simpleMode = false
		if(level === "simple") simpleMode = true
		let innerWidth = width - 20,
			innerHeight = height - 30
		//get the copy of the data, since we may render it again
		let arr = data.concat()

		return (
			<svg width={width} height={height} {...props} className={cls("chart-area", className)}>
				<AxisY data={arr} width={innerWidth} height={innerHeight} />
				<Area data={arr} parent={{width:innerWidth, height:innerHeight}} fill={fill} />
				<g transform={`translate(0,${innerHeight+10})`} className="left">
					<rect x={10} y={0} width={innerWidth} height={20} fill="#fafafa"/>
					<text>0</text>
					<line x2={innerWidth} stroke="#ccc" strokeOpacity={0.5} />
					{ simpleMode ? '' : <AxisX data={arr}  width={innerWidth} height={innerHeight}  /> }
				</g>
			</svg>
		)
	}
}