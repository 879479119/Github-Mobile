import React, {PureComponent} from "react";
import PropTypes from "prop-types"
import {Link} from "react-router-dom";
import "./CodeTree.scss";
import {Icon} from "antd";
import request from "../../../utils/request"
import formatSize from '../../../utils/formatSize'
import cls from "classnames"

export default class CodeTree extends PureComponent{

	render(){
		const { list, style, simple= false, className } = this.props
		for(let i = 0;i < list.length;i ++){
			if(list[i].type === 'dir') list.unshift(...list.splice(i,1))
		}
		return(
			<div className={cls("code-tree", className)} style={style}>
				<ul>{
					list.map((item, i)=>{
						return <Item key={i} item={item} simple={simple} />
					})
				}</ul>
			</div>
		)
	}
}

class Item extends PureComponent{
	constructor(...props){
		super(...props)
		this.state = {
			info: '---',
			date: '---',
			loading: true
		}
	}
	static contextTypes = {
		details: PropTypes.object
	}
	componentDidMount(){
		// const {owner, repo} = this.context.details.data
		// const {sha} = this.props.item
		// request(`/api/gitdata/getCommit`, {
		// 	owner, repo, sha
		// }).then(res => res.json()).then(json => {
		// 	console.info(json.data.data)
		// 	this.setState({
		// 		data: json.data.data,
		// 		loading: false
		// 	})
		// })
	}
	render(){
		const {item, simple} = this.props
		//TODO: master temp
		let f = item.url.match(/repos\/(.+)\?ref/)[1].replace(/contents/,'code/master')
		return (
			<li className={item.type}>
				<Link to={`/repo/${f}`}>
					<Icon type={item.type==='file'?'file-text':'folder'}/>{item.name}
				</Link>
				{simple ? null : <Link to={`/commit/${item.sha}`}>{item.sha}</Link>}
				<em>{item.size !== 0 ? formatSize(item.size) : ''}</em>
			</li>
		)
	}
}