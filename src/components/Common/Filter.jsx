import React from "react";
import "./Filter.scss";
import cls from "classnames"

export default function (props) {
	const {prefix, data, sort, style, type, defaultSelected} = props
	return (
		<div className={prefix||''+"filter"} style={style}>
			<ul>
				<li className="title">{type || 'Filter'}</li>
				{
					data.map((item, index)=>{
						let active = false
						if(item === defaultSelected) active = true
						return <li key={'f-'+index} className={cls('item', {active})}>{item}</li>
					})
				}
				{
					sort ? [<li className="title" key={'s'}>Sort</li>, <li key={'asc'} className="active">Asc</li>, <li key={'desc'}>Desc</li>] : ''
				}
			</ul>
		</div>
	)
}