import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import "./index.scss";
import {commonFetch, commonRelease} from "../../../../views/QueueRedux";
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
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class extends Component{
	static contextTypes = {
		details: PropTypes.object
	}
	componentDidMount(){
		const { commonFetch } = this.props,
			owner = this.props.match.params.username,
			repo = this.props.match.params.repo

		for(let i = 0;i < API.length;i ++){
			//noinspection JSUnfilteredForInLoop
			if(this.getData(API[i]).status === 3){}
			else { //noinspection JSUnfilteredForInLoop
				commonFetch(API[i], {owner, repo, path:''})
			}
		}
	}
	render = () => {
		const { details } = this.context
		const { username, repo } = this.props.match.params

		let content = this.getData(API[0])

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
				{(()=> {
					let fragment
					if (content.status === 3) {
						fragment = <CodeTree list={content.result.data.data} style={{display: 'inline-block', width: 'auto'}} simple={true} />
					} else if (content.status === 2) {
						fragment = <p>error</p>
					} else {
						fragment = <section className="loading" style={{minHeight: 250, textAlign: 'center', display: 'inline-block'}}><Spin style={{marginTop: 100}}/></section>
					}
					return fragment
				})()}
			</div>
		)
	}
}