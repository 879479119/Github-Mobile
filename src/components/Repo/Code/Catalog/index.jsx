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
	static contextTypes = {
		details: PropTypes.object
	}
	componentDidMount(){
		const { repoContentInit } = this.props
		let [, branch, path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
		repoContentInit(path)
	}
	render = () => {
		const { details } = this.context
		const {code} = this.props
		const { username, repo } = this.props.match.params

		console.info(312, code)

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
				{/*{(()=> {*/}
					{/*let fragment*/}
					{/*if (content.status === 3) {*/}
						{/*fragment = <CodeTree list={content.result.data.data} style={{display: 'inline-block', width: 'auto'}} simple={true} />*/}
					{/*} else if (content.status === 2) {*/}
						{/*fragment = <p>error</p>*/}
					{/*} else {*/}
						{/*fragment = <section className="loading" style={{minHeight: 250, textAlign: 'center', display: 'inline-block'}}><Spin style={{marginTop: 100}}/></section>*/}
					{/*}*/}
					{/*return fragment*/}
				{/*})()}*/}
			</div>
		)
	}
}