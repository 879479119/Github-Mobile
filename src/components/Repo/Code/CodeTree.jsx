import React from "react";
import {Link} from "react-router-dom";
import "./CodeTree.scss";
import {Icon} from "antd";
import formatSize from '../../../utils/formatSize'

export default function CodeTree(props) {
	const { list, style } = props
	for(let i = 0;i < list.length;i ++){
		if(list[i].type === 'dir') list.unshift(...list.splice(i,1))
	}
	return(
		<div className="code-tree" style={style}>
			<ul>{
				list.map((item, i)=>{
					let f = item.url.match(/repos\/(.+)\?ref/)[1]
					return <li key={i} className={item.type}><Link to={`/file/${f}`}><Icon type={item.type==='file'?'file-text':'folder'}/>{item.name}</Link><Link to={`/commit/${item.sha}`}>{item.sha}</Link><em>{item.size !== 0 ? formatSize(item.size) : ''}</em></li>
				})
			}</ul>
		</div>
	)
}
