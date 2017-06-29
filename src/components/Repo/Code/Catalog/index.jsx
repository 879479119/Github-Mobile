import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import "./index.scss";
import {commonFetch, commonRelease} from "../../../../views/QueueRedux";
import {repoContentInit} from "../../../../views/RepoRedux";
import addDataFetch from '../../../../redux/addDataFetch'
import {connect} from "react-redux";
import CodeTree from "../CodeTree";
import PathBreadcrumb from "../../../Common/Path"
import PropTypes from "prop-types"
import DirExplore from "./DirExplore"

const Option = Select.Option
const ButtonGroup = Button.Group
export const API = [
	'/api/repos/getContent'
]

@withRouter
@connect(state=>({
	code: state.repo.code
}),{ commonFetch, commonRelease, repoContentInit})
@addDataFetch
export default class extends Component{
	constructor(...props){
		super(...props)
	}
	static contextTypes = {
		details: PropTypes.object
	}
	// componentDidMount(){
	// 	const { repoContentInit } = this.props
	// 	let [, branch, path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
	// 	repoContentInit(path, true)
	// }
	callbackLink(path){
		const { repoContentInit } = this.props
		repoContentInit(path, false)
	}
	render = () => {
		const { details } = this.context
		const { code } = this.props
		const { username, repo } = this.props.match.params
		let [, branch, path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)

		let file = null
		if(code.file){
			let buffer = new Buffer(code.file.content, 'base64')
			file = buffer.toString()
		}

		return (
			<div className="main-body">
				<section>
					<Select defaultValue="master" style={{ width: 120 }}>
						<Option value="master">Master</Option>
						<Option value="lucy">Others</Option>
					</Select>
					<section style={{display: 'inline-block', marginLeft: 20}}>
						<PathBreadcrumb user={username} repo={repo} />
					</section>
					<ButtonGroup style={{float:'right'}}>
						<Button>Create new file</Button>
						<Button>Upload files</Button>
						<Button>Find file</Button>
						<Button>History</Button>
					</ButtonGroup>
				</section>
				<DirExplore callback={::this.callbackLink} defaultPath={path} repo={repo} owner={username} branch={'master'} />
				<div>
					<pre dangerouslySetInnerHTML={{__html: file}} />
				</div>
			</div>
		)
	}
}