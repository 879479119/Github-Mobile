import React from 'react'
import { Icon } from 'antd'
import BarChart from './BarChart'
import "./Chart.scss"

export default function ({data, width= 1000, height= 100}) {
	let innerContent = undefined
	if(data === void 0 || data.length === 0){
		innerContent = <Icon type="loading" />
	}else{
		innerContent = <BarChart data={data} parent={{width, height}}/>
	}

	return (
		<div className="common-chart" style={{width, height}}>
			{innerContent}
		</div>
	)
}