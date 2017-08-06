import React from 'react'
import { Icon } from 'antd'
import AreaChart from './AreaChart'
import BarChart from './BarChart'
import LinearChart from './LinearChart'
import PunchChart from './PunchChart'
import "./Chart.scss"
import cls from "classnames"

export default function ({data, width= 1000, height= 160, type, className, ...props}) {
	let innerContent = undefined
	if(data === void 0 || data.length === 0){
		innerContent = <Icon type="loading" />
	}else if(type === "smooth-path"){
		innerContent = <AreaChart data={data} parent={{width, height}} {...props}/>
	}else if(type === "bar"){
		innerContent = <BarChart data={data} parent={{width, height}} {...props}/>
	}else if(type === "linear"){
		innerContent = <LinearChart data={data} parent={{width, height}} {...props}/>
	}else if(type === "area"){
		innerContent = <AreaChart smooth={false} data={data} parent={{width, height}} {...props}/>
	}else if(type === "punch"){
		innerContent = <PunchChart data={data} parent={{width, height}} {...props}/>
	}

	return (
		<div className={cls("common-chart", className)}>
			{innerContent}
		</div>
	)
}