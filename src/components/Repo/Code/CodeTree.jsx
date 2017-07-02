import React, {PureComponent, Component} from "react";
import PropTypes from "prop-types"
import {Link} from "react-router-dom";
import "./CodeTree.scss";
import {Icon, Spin} from "antd";
import request from "../../../utils/request"
import formatSize from '../../../utils/formatSize'
import cls from "classnames"

export default class CodeTree extends Component{
	constructor(...props){
		super(...props)
		this.state = {
			directory: [],
			loading: true
		}
	}

	async updatePath(path){
		const {owner, repo} = this.props

		this.setState({
			loading: true
		})

		let content = await request("/api/repos/getContent",{
			owner: owner,
			repo: repo,
			path: path
		})

		this.setState({
			loading: false
		})

		return await content.json()
	}

	async componentDidMount() {
		const {path} = this.props

		let result = await this.updatePath(path)

		if(result.data.data.length){
			this.setState({
				directory: result.data.data
			})
		}else{
			this.props.getFile(result.data.data.content)
		}

	}

	async componentWillReceiveProps(nextProps){

		if(nextProps.path !== this.props.path){

			let result = await this.updatePath(nextProps.path)

			if(result.data.data.length){
				this.setState({
					directory: result.data.data
				})
			}

			console.info('updated')
		}
	}

	clickHandler(event){
		let path = ''
		if(event.target.href && (path = event.target.href.replace(/.*code\/master/,''))){
			const { callback } = this.props
			callback(path)
		}
	}

	render(){
		const { style, simple= false, className } = this.props
		let list = this.state.directory.slice()

		for(let i = 0;i < list.length;i ++){
			if(list[i].type === 'dir') list.unshift(...list.splice(i,1))
		}

		if(this.state.loading === true){
			return <div className={cls("code-tree", className)} style={style}>
				<Spin/>
			</div>
		}

		return(
			<div className={cls("code-tree", className)} style={style} onClick={::this.clickHandler}>
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
				<Link to={`/repo/${f}`} key={`/repo/${f}`}>
					<Icon type={item.type==='file'?'file-text':'folder'}/>{item.name}
				</Link>
				{simple ? null : <Link to={`/commit/${item.sha}`}>{item.sha}</Link>}
				<em>{item.size !== 0 ? formatSize(item.size) : ''}</em>
			</li>
		)
	}
}