import React from 'react'
import { Icon } from 'antd'
import BarChart from './BarChart'
import "./Chart.scss"
import cls from "classnames"

export default function ({data, width= 1000, height= 100, type, className, ...props}) {
	let innerContent = undefined
	if(data === void 0 || data.length === 0){
		innerContent = <Icon type="loading" />
	}else if(type === "smooth-path"){
		innerContent = <BarChart data={data} parent={{width, height}} {...props}/>
	}

	return (
		<div className={cls("common-chart", className)}>
			{innerContent}
		</div>
	)
}