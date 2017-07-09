import React, {PureComponent, Component} from "react";
import PropTypes from "prop-types"
import {Link} from "react-router-dom";
import "./CodeTree.scss";
import {Icon, Spin, Tooltip} from "antd";
import request from "../../../utils/request"
import formatSize from '../../../utils/formatSize'
import fromNow from '../../../utils/formatDate'
import emojizer from '../../../utils/emojizer'
import cls from "classnames"
import Lang from "../../../utils/languages"

export default class CodeTree extends Component{
	constructor(...props){
		super(...props)
		this.state = {
			directory: [],
			loading: true,
			fileDetail: undefined
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
			this.setState({
				fileDetail: result.data.data
			})
			this.props.getFile(result.data.data.content)
		}

	}

	// async componentWillReceiveProps(nextProps){
	//
	// 	if(nextProps.path !== this.props.path){
	//
	// 		let result = await this.updatePath(nextProps.path)
	//
	// 		if(result.data.data.length){
	// 			this.setState({
	// 				directory: result.data.data
	// 			})
	// 		}
	//
	// 		console.info('updated')
	// 	}
	// }

	clickHandler(event){
		let path = ''
		if(event.target.href && (path = event.target.href.replace(/.*code\/master/,''))){
			const { callback } = this.props
			callback(path)
		}
	}

	render(){
		const { style, simple= false, className,repo, owner } = this.props
		let list = this.state.directory.slice()

		for(let i = 0;i < list.length;i ++){
			if(list[i].type === 'dir') list.unshift(...list.splice(i,1))
		}

		if(this.state.loading === true){
			return <div className={cls("code-tree", className)} style={Object.assign({},style,{width: 300})}>
				<Spin/>
			</div>
		}

		if(this.state.fileDetail){
			const data = this.state.fileDetail
			let lang = '', color = ''
			try{
				//FIX: error with regexp
				lang = data.name.replace(/.*\./gi,'')
				let extensionMap = {
					js: 'JavaScript',
					php: 'PHP',
					rb: 'Ruby',
					html: 'HTML',
				}
				color = Lang[extensionMap[lang]]['color']
				console.info(color)
			}catch (E){
				console.info('CANNOT FIND THE COLOR OF THE EXT')
			}
			return(
				<div className={cls("code-tree", "file-type", className)} style={style}>
					<section className="bg_black">
						<div className="bg_white">
							<h3 style={{color: color}}>&lt;{lang}/&gt;</h3>
							<p>{data.name}</p>
						</div>
						<p className="download" ><Icon type="download"/>&nbsp;&nbsp;<a download href={data.download_url}>download</a></p>
					</section>
				</div>
			)
		}

		return(
			<div className={cls("code-tree", className)} style={style} onClick={::this.clickHandler}>
				<ul>{
					list.map((item, i)=>{
						return <HoverItem key={i} item={item} simple={simple} repo={repo} owner={owner} />
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



class HoverItem extends Item{
	constructor({...props}){
		super(...props)
		this.state = {
			sent: false,
			loading: true,
			list: []
		}
	}
	async handleHover(e){
		const {item: {name, path}, repo, owner} = this.props
		if(e === true && this.state.sent === false){
			let result = await request("/api/repos/getCommits",{
				owner: owner,
				repo: repo,
				path: path
			})

			this.setState({
				sent: true,
			})

			let data = await result.json()

			this.setState({
				list: data.data.data,
				loading: false
			})
		}
	}
	render(){
		let overlay = ''
		const {repo, owner} = this.props
		if(this.state.loading){
			overlay = <Icon type="loading" />
		}else if(this.state.sent === true && this.state.list.length > 0){
			//render the result list
			overlay = (
				<ul>
					{this.state.list.map((item, index)=>
						<li>
							<Link to={`/repo/${owner}/${repo}/commit/${item.sha}`}>
								<span className="ct-message">{emojizer(item.commit.message, false)}</span>
								<span style={{float: 'right'}}>{fromNow(item.commit.committer.date)}</span>
							</Link>
						</li>)}
				</ul>
			)
		}else{
			//error and reload
		}
		return (
			<Tooltip overlay={overlay} overlayClassName="tooltip-modified" onVisibleChange={::this.handleHover} mouseEnterDelay={0.5}>
				{super.render()}
			</Tooltip>
		)
	}
}